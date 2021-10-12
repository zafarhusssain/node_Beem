'use strict'
const Logger = use('Logger')
const Env = use('Env')
const Database = use('Database')
const Helpers = use('Helpers')
const public_path = Helpers.publicPath()
const Config = use('Config')
const success = Config.get('response.success')
const error = Config.get('response.error');
const responseService = use('App/Services/ResponseService')

const Merchant = use('App/Models/Merchant')
const MerchantUser = use('App/Models/MerchantUser')
const MerchantService = use('App/Models/MerchantService')
const Address = use('App/Models/Address')
const User = use('App/Models/User')
const Quote = use('App/Models/Quote')
const commonService = use('App/Services/CommonService')
const paymentService = use('App/Services/PaymentService')
const Stripe = require("stripe")(Env.get('STRIPE_SECRET_KEY', 'test'))


class MerchantController {

  async createMerchant({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const address = data.address
      const services = data.services
      var bank = { routing_number: data.routing_number, account_number: data.account_number }
      delete data.services
      delete data.address
      // delete data.routing_number
      // delete data.account_number

      const merchant = await Merchant.create(data, trx)

      // address.merchant_id = merchant.id
      // const merchantAddress = await Address.create(address)
      const addresses = merchant.addresses().create(address, trx)

      // const mServices = services.map(v => ({...v, merchant_id: merchant.id}))
      // const merchantServices = await MerchantService.createMany(mServices)
      const servicess = merchant.services().createMany(services, trx)

      if (request.file('hero_image')) {
        const hero_pic = request.file('hero_image', {
          types: ['image'],
          size: '2mb'
        })
        let imgName = `${merchant.id}_${merchant.business_name}_hero_${hero_pic.fieldName}.jpeg`
        await hero_pic.move(public_path + "/images/merchants/", {
          name: imgName,
          overwrite: true
        })
        merchant.hero_image = imgName
        if (!hero_pic.moved()) {
          await trx.rollback()
          let processedResponse = await responseService.processResponse('IMAGE_SIZE_EXCEED')
          return await error(processedResponse.message, processedResponse.code)
          //return await error(hero_pic.error().message, 'ERROR')
        }
        await merchant.save(trx)
      }

      let new_name_hero = `${merchant.id}_${merchant.business_name}_hero_base64.jpeg`
      let path_hero = `${public_path}/images/merchants/${merchant.id}_${merchant.business_name}_hero_base64.jpeg`

      var imageBuffer_hero = await commonService.createBuffer(data.hero_image_base64)

      var is_image_done_hero = await commonService.createFileFromBase64(path_hero, imageBuffer_hero)

      merchant.hero_image_url_from_base64 = new_name_hero
      await merchant.save(trx)

      if (request.file('logo')) {
        const logo_pic = request.file('logo', {
          types: ['image'],
          size: '2mb'
        })
        let imgName = `${merchant.id}_${merchant.business_name}_logo_${logo_pic.fieldName}.jpeg`
        await logo_pic.move(public_path + "/images/merchants/", {
          name: imgName,
          overwrite: true
        })
        merchant.logo = imgName
        if (!logo_pic.moved()) {
          await trx.rollback()
          let processedResponse = await responseService.processResponse('IMAGE_SIZE_EXCEED')
          return await error(processedResponse.message, processedResponse.code)
          //return await error(logo_pic.error().message, 'ERROR')
        }
        await merchant.save(trx)
      }

      let new_name_logo = `${merchant.id}_${merchant.business_name}_logo_base64.jpeg`
      let path_logo = `${public_path}/images/merchants/${merchant.id}_${merchant.business_name}_logo_base64.jpeg`

      var imageBuffer_logo = await commonService.createBuffer(data.logo_base64)

      var is_image_done_logo = await commonService.createFileFromBase64(path_logo, imageBuffer_logo)

      merchant.logo_url_from_base64 = new_name_logo
      await merchant.save(trx)


      var stripe_date = {
        merchant: merchant,
        address: address,
        bank: bank
      }

      const account = await paymentService.createConnectAccount(stripe_date)

      if (account.status) {
        merchant.stripe_merchant_id = account.data
        await merchant.save(trx)
        await trx.commit()
      } else {
        await trx.rollback();
        // let processedResponse = await responseService.processResponse('MERCHANT_STRIPE_FAILED')
        return await error(account, 400)
      }




      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(merchant, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getMerchant({ request, response, auth, params }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body

      const target_id = params.id

      const merchant = await Merchant
        .query()
        .with('addresses')
        .with('services')
        .where('id', target_id)
        .first()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(merchant, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getMerchants({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body

      const merchants = await Merchant.query().with('addresses').with('services').orderBy('business_name').fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(merchants, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async deleteMerchant({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body

      const target_id = data.merchant_id

      const merchant = await Merchant
        .query()
        .with('addresses')
        .with('services')
        .where('id', target_id)
        .delete()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(merchant, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async updateMerchant({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const target_id = data.merchant_id
      delete data.merchant_id
      delete data.hero_image
      delete data.logo

      const merchant = await Merchant.find(target_id)
      // const merchant = await Merchant
      //   .query()
      //   .where('id', target_id)
      //   .update(data)

      merchant.merge(data)
      await merchant.save(trx)

        if (request.file('hero_image')) {
          const hero_pic = request.file('hero_image', {
            types: ['image'],
            size: '2mb'
          })
          let imgName = `${merchant.id}_${merchant.business_name}_hero_${hero_pic.fieldName}.jpeg`
          await hero_pic.move(public_path + "/images/merchants/", {
            name: imgName,
            overwrite: true
          })
          merchant.hero_image = imgName
          if (!hero_pic.moved()) {
            await trx.rollback()
            let processedResponse = await responseService.processResponse('IMAGE_SIZE_EXCEED')
            return await error(processedResponse.message, processedResponse.code)
            //return await error(hero_pic.error().message, 'ERROR')
          }
          await merchant.save(trx)
        }

        let new_name_hero = `${merchant.id}_${merchant.business_name}_hero_base64.jpeg`
        let path_hero = `${public_path}/images/merchants/${merchant.id}_${merchant.business_name}_hero_base64.jpeg`

        var imageBuffer_hero = await commonService.createBuffer(data.hero_image_base64)

        var is_image_done_hero = await commonService.createFileFromBase64(path_hero, imageBuffer_hero)

        merchant.hero_image_url_from_base64 = new_name_hero
        await merchant.save(trx)

        if (request.file('logo')) {
          const logo_pic = request.file('logo', {
            types: ['image'],
            size: '2mb'
          })
          let imgName = `${merchant.id}_${merchant.business_name}_logo_${logo_pic.fieldName}.jpeg`
          await logo_pic.move(public_path + "/images/merchants/", {
            name: imgName,
            overwrite: true
          })
          merchant.logo = imgName
          if (!logo_pic.moved()) {
            await trx.rollback()
            let processedResponse = await responseService.processResponse('IMAGE_SIZE_EXCEED')
            return await error(processedResponse.message, processedResponse.code)
            //return await error(logo_pic.error().message, 'ERROR')
          }
          await merchant.save(trx)
        }

        let new_name_logo = `${merchant.id}_${merchant.business_name}_logo_base64.jpeg`
        let path_logo = `${public_path}/images/merchants/${merchant.id}_${merchant.business_name}_logo_base64.jpeg`

        var imageBuffer_logo = await commonService.createBuffer(data.logo_base64)

        var is_image_done_logo = await commonService.createFileFromBase64(path_logo, imageBuffer_logo)

        merchant.logo_url_from_base64 = new_name_logo
        await merchant.save(trx)

        await trx.commit()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(merchant, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getMerchantCustomerRelation({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())

      const user = await auth.getUser()

      if (user.role_id == 1) {
       var merchantIds = await Quote.query().where('user_id', user.id).where('status_id', 3).distinct('merchant_id').pluck('merchant_id')

        // var quotes = await Quote
        //   .query()
        //   .with('merchant')
        //   .where('user_id', user.id)
        //   .where('status_id', 3)
        //   // .distinct('user_id')
        //   .fetch()

          var result = await Merchant.query().whereIn('id', merchantIds).fetch()

      }
      if (user.role_id == 2) {
        const merchant_user = await MerchantUser.findBy('user_id', user.id)
        var merchant = await Merchant.find(merchant_user.merchant_id)

        var userIds = await Quote.query().where('merchant_id', merchant.id).where('status_id', 3).distinct('user_id').pluck('user_id')

        // var quotes = await Quote
        //   .query()
        //   .with('customer')
        //   .where('merchant_id', merchant.id)
        //   .where('status_id', 3)
        //   .distinct('merchant_id')
        //   .fetch()
        var result = await User.query().whereIn('id', userIds).fetch()
      }



      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(result, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }



  async createMerchantUserRelation({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const user = User.findBy('email', data.email)

      const address = await Merchant.query()
        .where('address_type_id', data.address_type_id)
        .where('user_id', user.id)

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(address, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async breakMerchantUserRelation({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const user = User.findBy('email', data.email)

      const address = await Merchant.query()
        .where('address_type_id', data.address_type_id)
        .where('user_id', user.id)

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(address, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getListCustomersRelatedToMerchant({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const user = User.findBy('email', data.email)

      const address = await Merchant.query()
        .where('address_type_id', data.address_type_id)
        .where('user_id', user.id)

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(address, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

}

module.exports = MerchantController
