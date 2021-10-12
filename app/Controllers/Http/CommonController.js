'use strict'

const AddressType = use('App/Models/AddressType')
const AdminType = use('App/Models/AdminType')
const CardType = use('App/Models/CardType')
const Gender = use('App/Models/Gender')
const MessageStatus = use('App/Models/MessageStatus')


const ServiceStatus = use('App/Models/ServiceStatus')
const InvoiceStatus = use('App/Models/InvoiceStatus')
const QuoteStatus = use('App/Models/QuoteStatus')
const ScheduleStatus = use('App/Models/ScheduleStatus')


const ResponseType = use('App/Models/ResponseType')
const Response = use('App/Models/Response')
const Status = use('App/Models/Status')
const RepeatType = use('App/Models/RepeatType')

const Role = use('App/Models/Role');
const userService = use('App/Services/UserService')
const Logger = use('Logger')
const Database = use('Database')
const Config = use('Config');
const success = Config.get('response.success');
const error = Config.get('response.error');
const responseService = use('App/Services/ResponseService')
const commonService = use('App/Services/CommonService')

var allCountries = require('./../../../resources/geography/countryLatest.json')
var allStates = require('./../../../resources/geography/stateLatest.json')
var allCities = require('./../../../resources/geography/cityLatest.json')


class CommonController {

  async getAddressTypes({ response, auth, request, session }) {
    try {
      const data = await AddressType.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getAdminTypes({ response, auth, request, session }) {
    try {
      const data = await AdminType.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getCardTypes({ response, auth, request, session }) {
    try {
      const data = await CardType.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getRoleTypes({ response, auth, request, session }) {
    try {
      const data = await Role.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getResponseTypes({ response, auth, request, session }) {
    try {
      const data = await ResponseType.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getStatusTypes({ response, auth, request, session }) {
    try {
      const data = await Status.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getRepeatTypes({ response, auth, request, session }) {
    try {
      const data = await RepeatType.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getAllResponses({ response, auth, request, session }) {
    try {
      const data = await Response.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getGenderTypes({ response, auth, request, session }) {
    try {
      const data = await Gender.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getMessageStatuses({ response, auth, request, session }) {
    try {
      const data = await MessageStatus.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getServiceStatuses({ response, auth, request, session }) {
    try {
      const data = await ServiceStatus.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getInvoiceStatuses({ response, auth, request, session }) {
    try {
      const data = await InvoiceStatus.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getQuoteStatuses({ response, auth, request, session }) {
    try {
      const data = await QuoteStatus.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getAppointmentStatuses({ response, auth, request, session }) {
    try {
      const data = await ScheduleStatus.all()
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data.toJSON(), processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getCounties({ response, auth, request, session }) {
    try {
      const keys_to_keep = ['id', 'name']
      const data = allCountries.map(e => {
        const obj = {};
        keys_to_keep.forEach(k => obj[k] = e[k])
        return obj;
      });
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data, processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getStatesByCountry({ response, auth, request, session }) {
    try {
      const url = request.originalUrl()
      const res = url.split("?country_id=")
      const country_id = res[1]

      var requiredStates = allStates.filter(c => c.country_id == country_id)

      const keys_to_keep = ['id', 'name', 'country_id']
      const data = requiredStates.map(e => {
          const obj = {};
          keys_to_keep.forEach(k => obj[k] = e[k])
          return obj;
      });


      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data, processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getCitiesByState({ response, auth, request, session }) {
    try {
      const url = request.originalUrl()
      const res = url.split("?state_id=")
      const state_id = res[1]


      var requiredCities = allCities.filter(c => c.state_id == state_id)

      const keys_to_keep = ['id', 'name', 'state_id','country_id']
      const data = requiredCities.map(e => {
          const obj = {};
          keys_to_keep.forEach(k => obj[k] = e[k])
          return obj;
      });
      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(data, processedResponse.message, processedResponse.code);
      return response.json(resp);
    } catch (err) {
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

}

module.exports = CommonController
