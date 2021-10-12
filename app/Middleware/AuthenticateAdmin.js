'use strict'
const Config = use('Config')
const error = Config.get('response.error')
const responseService = use('App/Services/ResponseService')

class AuthenticateAdmin {

  async handle({ request, auth, response }, next) {
    const user = await auth.getUser()
    if (!user.is_admin) {
      let processedResponse = await responseService.processResponse('ERR100')
      let resp =  await error(processedResponse.message, processedResponse.code, 403)
      return response.status(403).send(resp)
    }

    await next()
  }
}

module.exports = AuthenticateAdmin
