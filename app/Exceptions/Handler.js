'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Config = use('Config');
const errors = Config.get('response.error')
const responseService = use('App/Services/ResponseService')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    console.log('error in Exception Handler: '+ error)
    console.debug('It comes in Exception which is not handlled '+JSON.stringify(error))
    let processedResponse = await responseService.processResponse(error.code, true, error)
    let resp = await errors(processedResponse.message, processedResponse.code)
    response.status(error.status).send(resp)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
