'use strict'
const Logger = use('Logger')
const { formatters } = use('Validator')
const Config = use('Config');
const error = Config.get('response.error')
const responseService = use('App/Services/ResponseService')

class AuthUser {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|email|max:50',
      password: 'required|max:50'
    }
  }

  get messages() {
    return {
      'required': '{{ field }} is required',
      'email.email': 'You must provide a valid email address.',
      'max': 'Maximum length allowed for {{ field }} is {{ argument.0 }}',
      'min': 'Minimum length required for {{ field }} is {{ argument.0 }}'
    }
  }


  async fails(errorMessages) {
    Logger.warning(errorMessages)
    console.log(errorMessages.errors)
    let unique_constarint = errorMessages.errors[0].title
    let pointer = errorMessages.errors[0].source.email
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

module.exports = AuthUser
