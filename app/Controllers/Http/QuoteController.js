'use strict'
const Logger = use('Logger')
const Config = use('Config')
const success = Config.get('response.success')
const error = Config.get('response.error');
const responseService = use('App/Services/ResponseService')

const Quote = use('App/Models/Quote')
const Schedule = use('App/Models/Schedule')
const Repeat = use('App/Models/Repeat')

const Merchant = use('App/Models/Merchant')
const MerchantService = use('App/Models/MerchantService')
const Address = use('App/Models/Address')
const User = use('App/Models/User')
const commonService = use('App/Services/CommonService')

class CustomerQuoteController {

  async createCustomerQuote({ request, response, auth }) {
    try {
      Logger.info('request url is: ' + request.url())
      let data = request.body
      const user = await User.findBy('email', data.email)
      delete data.email
      data.user_id = user.id
      data.quote_date = new Date()
      const requested_services = data.requested_services
      delete data.requested_services
      data.status_id = 1
      data
      const quote = await Quote.create(data)
      await quote.services().createMany(requested_services)

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quote, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getCustomerAllQuotes({ request, response, auth, transform, params }) {
    try {
      Logger.info('request url is: ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?email=")
      const email = res[1]
      const user = await User.findBy('email', email)

      const quotes = await Quote
        .query()
        .with('status')
        .with('merchant')
        .where('user_id', user.id)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quotes, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getCustomerQuote({ request, response, auth, transform, params }) {
    try {
      Logger.info('request url is: ' + request.url())
      const id = params.id
      const quote = await Quote
        .query()
        .with('status')
        .with('address')
        .with('customer')
        .with('merchant')
        .with('services', (s) => { s.with('service').with('status') })
        .with('schedule', (s) => { s.with('repeat', (r) => r.with('type')).with('status') })
        .where('id', id)
        .first()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quote, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async updateCustomerQuote({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const id = data.quote_id
      delete data.quote_id

      const quote = await Quote.query()
        .where('id', id)
        .update(data)

      if (data.status_id == 3) {
        const confirm = await Schedule.query().where('quote_id', id).update({ status_id: '1' })
      }

      if (data.status_id == 4) {
        const cancel = await Schedule.query().where('quote_id', id).update({ status_id: '4' })
      }



      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quote, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getCustomerQuotes({ request, response, auth, transform }) {
    try {
      Logger.info('request url is: ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?email=")
      const r = res[1].split("&status_id=")
      const email = r[0]
      const status_id = r[1]
      const user = await User.findBy('email', email)

      const quotes = await Quote
        .query()
        .with('status')
        .with('merchant')
        .where('user_id', user.id)
        .where('status_id', status_id)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quotes, processedResponse.message, processedResponse.code)
      return response.json(resp)


    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async deleteCustomerQuote({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      let data = request.body
      const quote = await Quote.query().where('id', data.quote_id).delete()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quote, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  // Merchant Part

  async createMerchantQuote({ request, response, auth }) {
    try {
      Logger.info('request url is: ' + request.url())
      let data = request.body
      var quote = await Quote.find(data.quote_id)

      quote.merchant_description = data.merchant_description
      quote.amount = data.amount
      quote.status_id = 2
      quote.issue_date = new Date(),
        await quote.save()

      if (data.schedule.is_repeat) {
        var interval = 30
        if (data.schedule.repeat_type_id == '2') {
          interval = 1
        } else if (data.schedule.repeat_type_id == '3') {
          interval = 7
        } else if (data.schedule.repeat_type_id == '4') {
          interval = 15
        } else if (data.schedule.repeat_type_id == '5') {
          interval = 30
        } else if (data.schedule.repeat_type_id == '6') {
          interval = 120
        } else if (data.schedule.repeat_type_id == '7') {
          interval = 180
        } else if (data.schedule.repeat_type_id == '8') {
          interval = 360
        } else {
          interval = 30
        }

        for (let index = 0; index < 10; index++) {
          // let srt = new Date(data.schedule.start_date)
          var someDate = new Date(data.schedule.start_date);
          someDate.setDate(someDate.getDate() + (interval * index)); //number  of days to add, e.x. 15 days
          var dateFormated = someDate.toISOString().substr(0, 10);
          if (index > 0) {
            var schedule_data = {
              merchant_id: quote.merchant_id,
              initial_date: new Date(data.schedule.start_date),
              start_date: dateFormated,
              user_id: quote.user_id,
              is_repeat: data.schedule.is_repeat,
            }
          } else {
            var schedule_data = {
              merchant_id: quote.merchant_id,
              initial_date: new Date(data.schedule.start_date),
              start_date: new Date(data.schedule.start_date),
              user_id: quote.user_id,
              is_repeat: data.schedule.is_repeat,
            }
          }


          const schedule = await quote.schedule().create(schedule_data)

          let repeat_data = {
            repeat_type_id: data.schedule.repeat_type_id,
            day_number: data.schedule.day_number,
            day_name: data.schedule.day_name,
            tentative_start_time: data.schedule.time
          }

          const repeat = await schedule.repeat().create(repeat_data)

        }
      } else {
        let schedule_data = {
          merchant_id: quote.merchant_id,
          initial_date: new Date(data.schedule.start_date),
          start_date: new Date(data.schedule.start_date),
          user_id: quote.user_id,
          is_repeat: data.schedule.is_repeat,

        }
        const schedule = await quote.schedule().create(schedule_data)

      }






      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quote, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getMerchantAllQuotes({ request, response, auth, transform, params }) {
    try {
      Logger.info('request url is: ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?merchant_id=")
      const id = res[1]
      const merchant = await Merchant.find(id)
      const quotes = await Quote
        .query()
        .with('status')
        .with('customer')
        .where('merchant_id', merchant.id)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quotes, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getMerchantQuote({ request, response, auth, transform, params }) {
    try {
      Logger.info('request url is: ' + request.url())
      const id = params.id
      const quote = await Quote
        .query()
        .with('status')
        .with('address')
        .with('customer')
        .with('merchant')
        .with('services', (s) => { s.with('service').with('status') })
        .with('schedule', (s) => { s.with('repeat', (r) => r.with('type')).with('status') })
        .where('id', id)
        .first()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quote, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async updateMerchantQuote({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const id = data.quote_id
      delete data.quote_id

      const quote = await Quote.query()
        .where('id', id)
        .update(data)
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quote, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getMerchantQuotes({ request, response, auth, transform }) {
    try {
      Logger.info('request url is: ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?merchant_id=")
      const r = res[1].split("&status_id=")
      const merchant_id = r[0]
      const status_id = r[1]
      const merchant = await Merchant.find(merchant_id)
      const quotes = await Quote
        .query()
        .with('status')
        .with('customer')
        .where('merchant_id', merchant.id)
        .where('status_id', status_id)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quotes, processedResponse.message, processedResponse.code)
      return response.json(resp)

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async deleteMerchantQuote({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      let data = request.body
      const quote = await Quote.query().where('id', data.quote_id).delete()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(quote, processedResponse.message, processedResponse.code);
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

module.exports = CustomerQuoteController
