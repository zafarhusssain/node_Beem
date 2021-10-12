'use strict'
const Env = use('Env')
const SECRET_KEY = Env.get('SECRET_KEY')
const Config = use('Config')
const error = Config.get('response.error')
const responseService = use('App/Services/ResponseService')

class AuthenticateApiKey {

  async handle({ request, response }, next) {
    const api_key = request.header('api_key')
    if (api_key !== SECRET_KEY) {
      let processedResponse = await responseService.processResponse('ERR001')
      let resp =  await error(processedResponse.message, processedResponse.code, 401)
      return response.status(401).send(resp)
    }

    await next()
  }
}

module.exports = AuthenticateApiKey
