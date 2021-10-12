'use strict'
const Logger = use('Logger')
const { formatters } = use('Validator')
const Config = use('Config');
const error = Config.get('response.error')
const responseService = use('App/Services/ResponseService')
const { rule } = require('indicative')

class UpdateUser {

  get validateAll() {
    return true
  }

  get rules() {
    const data = this.ctx.request.post()
    console.log('current context: ', data.user_id)
    return {
      email: `unique_multiple:users,email,is_deleted/1, id/${data.user_id}`,
      phone_number: 'required|max:10',
      status_id: 'required'
    }
  }

  get messages() {
    return {
      'required': '{{ field }} is required',
      'requiredWhen': '{{ field }} is required',
      'email.email': 'You must provide a valid email address.',
      'unique': '{{ field }} already exist',
      'max': 'Maximum length allowed for {{ field }} is {{ argument.0 }}',
      'min': 'Minimum length required for {{ field }} is {{ argument.0 }}',
      'unique_multiple': '{{ field }} already exist'
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
    if (unique_constarint == 'unique' || unique_constarint == 'uniqueMultiple') {
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

module.exports = UpdateUser
