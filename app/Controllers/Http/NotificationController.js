'use strict'
const Logger = use('Logger')
const Config = use('Config')
const success = Config.get('response.success')
const error = Config.get('response.error')
const responseService = use('App/Services/ResponseService')

const Notification = use('App/Models/Notification')
const User = use('App/Models/User')
const MerchantUser = use('App/Models/MerchantUser')
const Merchant = use('App/Models/Merchant')
const commonService = use('App/Services/CommonService')
// const NotificationTransformer = use('App/Transformers/AddressTransformer')
// const BumblebeeTransformer = use('Bumblebee/Transformer')

class NotificationController {
  async createNotification({ request, response, auth }) {
    try {
      Logger.info('request url is: ' + request.url())
      const user = await auth.getUser()
      let data = request.body
      delete data.email
      data.user_id = user.id
      const notification = await Notification.create(data)

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        notification,
        processedResponse.message,
        processedResponse.code
      )
      return response.json(resp)
    } catch (err) {
      // await trx.rollback()
      await commonService.consoleError(
        this.constructor.name,
        new Error(),
        err.message,
        err
      )
      let processedResponse = await responseService.processResponse(
        err.code,
        true,
        err
      )
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getNotifications({ request, response, auth, transform }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const user = await auth.getUser()

      const notification = await Notification.query()
        // .where('notification_type_id', data.notification_type_id)
        .where('user_id', user.id)
        .fetch()

      const re = await transform.collection(
        notification,
        NotificationTransformer
      )

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        re,
        processedResponse.message,
        processedResponse.code
      )
      return response.json(resp)
    } catch (err) {
      // await trx.rollback()
      await commonService.consoleError(
        this.constructor.name,
        new Error(),
        err.message,
        err
      )
      let processedResponse = await responseService.processResponse(
        err.code,
        true,
        err
      )
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async deleteNotification({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const user = await auth.getUser()

      const notification = await user
        .notifications()
        .where('id', user.id)
        .delete()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        notification,
        processedResponse.message,
        processedResponse.code
      )
      return response.json(resp)
    } catch (err) {
      // await trx.rollback()
      await commonService.consoleError(
        this.constructor.name,
        new Error(),
        err.message,
        err
      )
      let processedResponse = await responseService.processResponse(
        err.code,
        true,
        err
      )
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async updateNotification({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const user = await auth.getUser()

      const notification = user
        .notifications()
        .where('id', user.id)
        .update(data)

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        notification,
        processedResponse.message,
        processedResponse.code
      )
      return response.json(resp)
    } catch (err) {
      // await trx.rollback()
      await commonService.consoleError(
        this.constructor.name,
        new Error(),
        err.message,
        err
      )
      let processedResponse = await responseService.processResponse(
        err.code,
        true,
        err
      )
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }
}

module.exports = NotificationController
