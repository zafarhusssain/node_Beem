'use strict'
const Logger = use('Logger')
const { formatters } = use('Validator')
const Config = use('Config');
const error = Config.get('response.error')
const responseService = use('App/Services/ResponseService')

class RegisterUser {

  get validateAll() {
    return true
  }

  get rules() {
    return {
      role_id: 'required|max:1',
      email: 'required|email|unique:users,email,is_deleted,1|max:50',
      first_name: 'required|max:50',
      last_name: 'required|max:50',
      phone_number: 'required|max:10',
      password: 'required|max:50'
    }
  }

  get messages() {
    return {
      'required': '{{ field }} is required',
      'email.email': 'You must provide a valid email address.',
      'unique': '{{ field }} already exist',
      'max': 'Maximum length allowed for {{ field }} is {{ argument.0 }}',
      'min': 'Minimum length required for {{ field }} is {{ argument.0 }}'
    }
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email',
      role_id: 'to_int'
    }
  }

  get data() {
    // const requestBody = this.ctx.request.all()
    // const api_key = this.ctx.request.header('key')
    // return Object.assign({}, requestBody, { api_key })
  }

  get formatter() {
    return formatters.JsonApi
  }

  // async authorize () {
  //   // if (!isAdmin) {
  //   //   this.ctx.response.unauthorized('Not authorized')
  //   //   return false
  //   // }
  //   // return true
  // }

  async fails(errorMessages) {
    Logger.warning(errorMessages)
    console.log(errorMessages.errors)
    let unique_constarint = errorMessages.errors[0].title
    let pointer = errorMessages.errors[0].source.pointer
    let processedResponse = {}
    if (unique_constarint == 'unique') {
      let code = pointer == 'email' ? 'ERR006' : 'ERR000'
      processedResponse = await responseService.processResponse(code)
    } else {
      processedResponse.message = errorMessages.errors[0].detail
      processedResponse.code = null
    }
    let resp = await error(processedResponse.message, processedResponse.code)
    return this.ctx.response.send(resp)
  }
}

module.exports = RegisterUser
