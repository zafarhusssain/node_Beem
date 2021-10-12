'use strict'
const Logger = use('Logger')
const Database = use('Database')
const Config = use('Config')
const success = Config.get('response.success')
const error = Config.get('response.error')
const responseService = use('App/Services/ResponseService')

const Schedule = use('App/Models/Schedule')
const Address = use('App/Models/Address')
const Invoice = use('App/Models/Invoice')
const Quote = use('App/Models/Quote')
const QuoteService = use('App/Models/QuoteService')
const ScheduleStatus = use('App/Models/ScheduleStatus')
const Repeat = use('App/Models/Repeat')
const RepeatType = use('App/Models/RepeatType')
const User = use('App/Models/User')
const Merchant = use('App/Models/Merchant')
const MerchantService = use('App/Models/MerchantService')
const commonService = use('App/Services/CommonService')

class AppointmentController {

  async getCustomerAppointments({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?email=")
      const email = res[1]
      const user = await User.findBy('email', email)
      const schedules = await Schedule.query()
        .with('repeat', (r) => r.with('type'))
        .with('merchant')
        .with('status')
        .where('user_id', user.id)
        .whereIn('status_id', [1,2,3])
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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

  async getCustomerAppointmentsWithDate({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?email=")
      const res2 = res[1].split("&date=")
      const email = res2[0]
      const date = res2[1]
      const user = await User.findBy('email', email)
      const schedules = await Schedule.query()
        .with('repeat', (r) => r.with('type'))
        .with('merchant')
        .with('status')
        .where('user_id', user.id)
        .whereIn('status_id', [1,2,3])
        .whereRaw('DATE(start_date)=?', [date])
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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

  async getCustomerAppointment({ request, response, auth, params }) {
    try {
      Logger.info('request url is ' + request.url())
      const id = params.id
      const schedules = await Schedule.query()
        .with('repeat', (r) => r.with('type'))
        .with('merchant')
        .with('status')
        .where('id', id)
        // .where('status_id', 1)
        .first()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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

  async updateCustomerAppointment({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.body
      const user = User.findBy('email', data.email)

      const address = await Address.query()
        .where('address_type_id', data.address_type_id)
        .where('user_id', user.id)

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        address,
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

  async deleteCustomerAppointment({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      let data = request.body
      const appointment = await Schedule.query().where('id', data.appointment_id).where('status_id', 1).delete()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        appointment,
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

  async deleteAllCustomerAppointments({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      let data = request.body
      const sched = await Schedule.find(data.appointment_id)
      const appointments = await Schedule.query().where('quote_id', sched.quote_id).where('status_id', 1).delete()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        appointments,
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

  async getCustomerCompletedAppointmentsDate({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?email=")
      const email = res[1]
      const user = await User.findBy('email', email)
      const schedules = await Schedule.query()
        .where('status_id', 3)
        .where('user_id', user.id)
        .distinct('start_date')
        .pluck('start_date')

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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

  async getCustomerScheduledAppointmentsDate({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?email=")
      const email = res[1]
      const user = await User.findBy('email', email)
      const schedules = await Schedule.query()
        .where('status_id', 1)
        .where('user_id', user.id)
        .distinct('start_date')
        .pluck('start_date')

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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

  //merchant

  async getMerchantAppointments({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?merchant_id=")
      const merchant_id = res[1]
      const merchant = await Merchant.find(merchant_id)
      const schedules = await Schedule.query()
        .with('repeat', (r) => r.with('type'))
        .with('customer')
        .with('status')
        .whereIn('status_id', [1,2,3])
        .where('merchant_id', merchant.id)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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
  async getMerchantAppointmentsWithDate({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?merchant_id=")
      const res2 = res[1].split("&date=")
      const merchant_id = res2[0]
      const date = res2[1]
      const merchant = await Merchant.find(merchant_id)
      const schedules = await Schedule.query()
        .with('repeat', (r) => r.with('type'))
        .with('customer')
        .with('status')
        .whereIn('status_id', [1,2,3])
        .where('merchant_id', merchant.id)
        .whereRaw('DATE(start_date)=?', [date])
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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

  async getMerchantAppointment({ request, response, auth, params }) {
    try {
      Logger.info('request url is ' + request.url())
      const id = params.id
      const schedules = await Schedule.query()
        .with('repeat', (r) => r.with('type'))
        .with('customer')
        .with('quote', (q) => q.with('services', (s) => s.with('service'), q.with('address')))
        .with('status')
        // .where('status_id', 1)
        .where('id', id)
        .first()

      // const address  = await

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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

  async updateMerchantAppointment({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const data = request.only(['appointment_id', 'services'])
      var schedule_data = {}
      schedule_data = request.except(['appointment_id', 'services'])
      const id = data.appointment_id
      delete data.appointment_id
      const schedule = await Schedule.find(id)
      if (schedule_data.status_id === 2) {
        var today = new Date();
        schedule_data.start_date = new Date()
        schedule_data.start_time = today.getHours() + ":" + today.getMinutes()
        delete data.services
        const quote_services = await QuoteService.query().where('quote_id', schedule.quote_id).update(data)
      }

      if (schedule_data.status_id === 3) {
        var today = new Date();
        schedule_data.end_date = new Date()
        schedule_data.end_time = today.getHours() + ":" + today.getMinutes()
        const serviceIds = data.services
        console.log('serviceIds: ', serviceIds)
        delete data.services
        const quote_services = await QuoteService.query().whereIn('service_id', serviceIds).update(data)

        const amount = await Database.from('merchant_services').whereIn('id', serviceIds).getSum('amount')
        let invoice_data = {
          quote_id: schedule.quote_id,
          amount: amount,
          merchant_id: schedule.merchant_id,
          user_id: schedule.user_id,
          generate_date: new Date()
        }
        var invoice = await Invoice.create(invoice_data)
      }

      schedule.merge(schedule_data)
      await schedule.save()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedule,
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

  async deleteMerchantAppointment({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      let data = request.body
      const appointment = await Schedule.query().where('id', data.appointment_id).delete()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        appointment,
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

  async getMerchantCompletedAppointmentsDate({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?merchant_id=")
      const merchant_id = res[1]
      const merchant = await Merchant.find(merchant_id)
      const schedules = await Schedule.query()
        .where('status_id', 3)
        .where('merchant_id', merchant.id)
        .distinct('start_date')
        .pluck('start_date')

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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

  async getMerchantScheduledAppointmentsDate({ request, response, auth }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?merchant_id=")
      const merchant_id = res[1]
      const merchant = await Merchant.find(merchant_id)
      const schedules = await Schedule.query()
        .where('status_id', 1)
        .where('merchant_id', merchant.id)
        .distinct('start_date')
        .pluck('start_date')

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(
        schedules,
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

module.exports = AppointmentController
