'use strict'
const Config = use('Config')
const error = Config.get('response.error')
const responseService = use('App/Services/ResponseService')

class AuthenticateAdminOrSelf {

  async handle({ request, auth, response }, next) {
    const user = await auth.getUser()
    const data = request.post()
    const id = user.id
    console.log(data.user_id, id, user.is_admin)
    if (user.is_admin == false && data.user_id != id) {
      let processedResponse = await responseService.processResponse('ERR100')
      let resp =  await error(processedResponse.message, processedResponse.code, 403)
      return response.status(403).send(resp)
    }

    await next()
  }
}

module.exports = AuthenticateAdminOrSelf
