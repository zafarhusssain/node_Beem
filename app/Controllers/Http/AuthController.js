'use strict'
const Logger = use('Logger')
const Database = use('Database')
const Validator = use('Validator')
const Config = use('Config')
const success = Config.get('response.success')
const error = Config.get('response.error')
const responseService = use('App/Services/ResponseService')
const Hash = use('Hash')
const Event = use('Event')
const Env = use('Env')
var requests = require('request');
var fs = require('fs');
// var SendBird = require('sendbird-nodejs');
// var sb = new SendBird(Env.get('SEND_BIRD_API_TOKEN'));
// var sb = new SendBird('0f0182a435957b5ab25496c8411a2b1a2b1d3816');
// var sb = new SendBird({appId: 'BAC0D597-66D7-48EE-AF06-61BAE07B41E6'});

const { validate } = use('Validator')
const User = use('App/Models/User')
const SendBird2 = use('App/Models/SendBird')
const Token = use('App/Models/Token')
const Merchant = use('App/Models/Merchant')
const MerchantUser = use('App/Models/MerchantUser')
const userService = use('App/Services/UserService')
// const SocialAccount = use('App/Models/SocialAccount')
// const UserDevice = use('App/Models/UserDevice')
const commonService = use('App/Services/CommonService')
const request_as = require('async-request')

const Helpers = use('Helpers')
const public_path = Helpers.publicPath()

class AuthController {

  async register({
    request,
    response,
    auth
  }) {
    const trx = await Database.beginTransaction()
    try {
      Logger.info('request url is ' + request.url())
      console.log('----------------------All request------------------------')
      // console.log(request.all())
      let data = request.body

      console.log('--------------------request data------------------------------')
      // console.log(data)
      // console.log('multipart:  ---->', request.multipart)

      console.log('--------------------request header------------------------------')
      // const header = JSON.stringify(request.headers())
      // console.log(request.headers())
      // console.log(header)
      console.log('--------------------request header------------------------------')

      console.log('--------------------seperate------------------------------')


      console.log('--------------------File------------------------------')
      const filedata = request.file('display_picture_url')
      // console.log(filedata)
      console.log(data.display_picture_url)
      console.log('--------------------File------------------------------')


      const userData = request.only(['display_picture_base64', 'display_picture_url', 'email', 'phone_number', 'first_name', 'last_name', 'role_id', 'password', 'merchant_id', 'is_admin', 'admin_type_id'])
      const base64String = request.only(['display_picture_base64'])
      const deviceData = request.only(['device_type', 'device_token'])

      if (userData.role_id == '2') {
        var merchant = await Merchant.find(userData.merchant_id)

        if (!merchant) {
          let processedResponse = await responseService.processResponse('ERR010')
          let resp = await error(processedResponse.message, processedResponse.code)
          return resp
        }
      }
      delete userData.merchant_id

      // const user = new User()
      // user.role_id = data.role_id
      // user.status_id = '1' //Active
      // user.email = data.email
      // user.first_name = data.first_name
      // user.last_name = data.last_name
      // user.phone_number = data.phone_number
      // user.password = data.password

      // await user.save(trx)
      // await trx.commit()


      const user = await User.create(userData, trx)
      if (merchant) {
        let merchant_user = {
          merchant_id: merchant.id,
          user_id: user.id
        }
        const merchantUser = await MerchantUser.create(merchant_user, trx)

      }

      if (user) {
        if (request.file('display_picture_url')) {
          const profilePics = request.file('display_picture_url', {
            types: ['image'],
            size: '2mb'
          })
          let imgName = `${user.id}_${user.first_name}_${user.last_name}_${profilePics.fieldName}.jpeg`
          await profilePics.move(public_path + "/images/users/", {
            name: imgName,
            overwrite: true
          })
          user.display_picture_url = imgName
          if (!profilePics.moved()) {
            await trx.rollback()
            let processedResponse = await responseService.processResponse('IMAGE_SIZE_EXCEED')
            return await error(processedResponse.message, processedResponse.code)
            //return await error(profilePics.error().message, 'ERROR')
          }
          await user.save(trx)
        }

          let new_name = `${user.id}_${user.first_name}_${user.last_name}_base64.jpeg`
          let path = `${public_path}/images/users/${user.id}_${user.first_name}_${user.last_name}_base64.jpeg`

          var imageBuffer = await commonService.createBuffer(base64String.display_picture_base64)

          var is_image_done = await commonService.createFileFromBase64(path, imageBuffer)

          user.display_picture_url_from_base64 = new_name
          await user.save(trx)



        if (deviceData) {
          const device = await user.device().create(deviceData, trx)
        }

        const randomNumber  = Math.floor(100000 + Math.random() * 900000)
        var options = {
          'method': 'POST',
          'url': Env.get('SEND_BIRD_API_URL') + '/v3/users',
          'headers': {
            'Api-Token': Env.get('SEND_BIRD_API_TOKEN'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "user_id": userData.first_name + userData.last_name + randomNumber,
            "nickname": userData.first_name + userData.last_name + '-' + randomNumber,
            "profile_url": '',
            "issue_access_token": true // (Optional)
          })
        };
        var sendbird_response = await commonService.createSendBirdUser(options)

        var re = JSON.parse(sendbird_response)
        var obj = {
          user_id: user.id,
          sendbird_user_id: re.user_id,
          phone_number: re.phone_number,
          nickname: re.nickname,
          profile_url: re.profile_url,
          access_token: re.access_token,
          last_seen_at: re.last_seen_at,
          is_online: re.is_online,
          has_ever_logged_in: re.has_ever_logged_in,
          is_active: re.is_active
        }
        var sendbird_data = await SendBird2.create(obj, trx)
      }

      await trx.commit()

      console.log('after user if')
      let token = await auth.generate(user)
      user.token = token.token
      var sendbird = await user.sendbird().fetch()
      user.sendbird = sendbird

      if(merchant){
        user.merchant = merchant
      }

      let processedResponse = await responseService.processResponse('MSG001')
      let resp = await success(user, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      await trx.rollback()
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async login({
    request,
    response,
    auth
  }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      let token = await auth.attempt(data.email, data.password)

      var user = await User.findBy('email', data.email)
      user = user.toJSON()
      user.token = token.token

      if (user.role.id === 2) {
        const merchant_user = await MerchantUser.findBy('user_id', user.id)
        var merchant = await Merchant.find(merchant_user.merchant_id)
        user.merchant = merchant
      }

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(user, processedResponse.message, processedResponse.code)
      return response.json(resp)

    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async changePassword({
    request,
    response,
    auth
  }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const user = await auth.getUser()
      const verifyPassword = await Hash.verify(
        data.password,
        user.password
      )

      if (!verifyPassword) {
        let processedResponse = await responseService.processResponse('ERR003')
        let resp = await error(processedResponse.message, processedResponse.code);
        return response.json(resp);
      }

      user.password = data.new_password
      await user.save()

      let processedResponse = await responseService.processResponse('MSG003')
      let resp = await success([], processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  // async resetPassword({ request, response, auth }) {
  //     try {
  //         Logger.info('request url is ' + request.url())

  //         const request_body = request.body
  //         let user = await User.findBy('email', request_body.email)

  //         if (!user) {
  //             let processedResponse = await responseService.processResponse('ERR004')
  //             let resp = await error(processedResponse.message, processedResponse.code);
  //             return response.json(resp);
  //         }

  //         let new_password = Math.random().toString(36).slice(2)//Math.floor(1000 + Math.random() * 9000).toString()
  //         user.password = new_password
  //         await user.save()
  //         let data = {
  //             name: user.first_name,
  //             email: user.email,
  //             password: new_password
  //         }
  //         //This Event will send Email to the user.
  //         Event.fire('reset::password', data)

  //         let processedResponse = await responseService.processResponse('MSG002')
  //         let resp = await success([], processedResponse.message, processedResponse.code);
  //         return response.json(resp);

  //     } catch (err) {
  //         await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
  //         let processedResponse = await responseService.processResponse(err.code, true, err)
  //         let resp = await error(processedResponse.message, processedResponse.code)
  //         return resp
  //     }
  // }

  async forgotPassword({
    request,
    response,
    auth
  }) {
    try {
      Logger.info('request url is ' + request.url())

      const request_body = request.body
      let user = await User.findBy('email', request_body.email)

      if (!user) {
        let processedResponse = await responseService.processResponse('ERR007')
        let resp = await error(processedResponse.message, processedResponse.code)
        return response.json(resp)
      }


      let hashToken = await Hash.make(request_body.email + Math.random() + request_body.email)
      const existingTokens = await Token.query().where('user_id', user.id).where('is_revoked', false).where('type', 'forgot_password').update({
        is_revoked: true
      })
      const mailToken = await Token.create({
        user_id: user.id,
        token: hashToken,
        type: 'forgot_password',
        is_revoked: false
      })
      user.mail_token = hashToken
      let link = Env.get('APP_URL') + '/password/reset?token=' + hashToken

      //let new_password = Math.random().toString(36).slice(2)//Math.floor(1000 + Math.random() * 9000).toString()

      let data = {
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        link: link
      }
      //This Event will send Email to the user.
      Event.fire('reset::password', data)

      let processedResponse = await responseService.processResponse('MSG002')
      let resp = await success([], processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async resetShow({
    params,
    request,
    response,
    view,
    session
  }) {
    try {
      const url = request.originalUrl()
      var res = url.split("?token=")
      let mail_token = res[1]
      return view.render('password.reset-password', {
        token: mail_token
      })

    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      session.flash({
        type: 'danger',
        message: processedResponse.message
      })
      return response.redirect('back')
    }

  }

  async resetPassword({
    request,
    response,
    auth,
    session,
    view
  }) {
    try {
      Logger.info('request url is ' + request.url())
      const request_body = request.body

      const rules = {
        token: 'required',
        password: 'required|max:50',
        password_confirmation: 'required_if: password|same:password',
      }
      const messages = {
        'required': '{{ field }} is required',
        'required_if': '{{ field }} is required',
        'same': '{{ field }} must be same as password',
        'max': 'Maximum length allowed for {{ field }} is {{ argument.0 }}'
      }

      const validation = await validate(request.all(), rules, messages)

      if (validation.fails()) {
        session.flash({
          type: 'danger',
          message: validation.messages()[0].message
        })
        return response.redirect('back')
      }

      const mailToken = await Token.query().where('token', request_body.token).where('is_revoked', false).first()

      if (!mailToken) {
        let processedResponse = await responseService.processResponse('INVALID_TOKEN')
        session.flash({
          type: 'danger',
          message: processedResponse.message
        })
        return response.redirect('back')
      }

      // const user = await User.query().with('tokens', (t) => { t.where('token', request_body.token) }).first()
      const user = await User.find(mailToken.user_id)
      if (!user) {
        let processedResponse = await responseService.processResponse('USER_NOT_FOUND')
        session.flash({
          type: 'danger',
          message: processedResponse.message
        })
        return response.redirect('back')
      }
      user.password = request_body.password
      await user.save()

      mailToken.is_revoked = true
      mailToken.save()

      let processedResponse = await responseService.processResponse('MSG002')
      session.flash({
        type: 'success',
        message: processedResponse.message
      })
      return response.redirect('back')

    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      session.flash({
        type: 'danger',
        message: processedResponse.message
      })
      return response.redirect('back')
    }
  }

  async logout({
    request,
    response,
    auth
  }) {
    try {
      Logger.info('request url is ' + request.url())
      const user = await auth.getUser()
      const deviceData = {
        device_type: '',
        device_token: ''
      }
      await user.device().update(deviceData)
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(null, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

}

module.exports = AuthController
