'use strict'
const Logger = use('Logger')
const Config = use('Config')
const success = Config.get('response.success')
const error = Config.get('response.error');
const responseService = use('App/Services/ResponseService')

const Merchant = use('App/Models/Merchant')
const MerchantService = use('App/Models/MerchantService')
const Address = use('App/Models/Address')
const User = use('App/Models/User')
const commonService = use('App/Services/CommonService')
// const ServiceTransformer = use('App/Transformers/ServiceTransformer')
const BumblebeeTransformer = use('Bumblebee/Transformer')

class ServiceController {

    async createMerchantService({ request, response, auth }) {
        try {
            Logger.info('request url is: ' + request.url())
            let data = request.body
            const merchant = await Merchant.findBy('id', data.merchant_id)
            delete data.merchant_id
            const service = await merchant.services().create(data)

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(service, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async getMerchantService({ request, response, auth, transform, params }) {
        try {
            Logger.info('request url is ' + request.url())
            const param_id = params.id
            let data = request.body
            const merchant = await Merchant.findBy('id', data.merchant_id)

            const service = await merchant
                .services()
                .where('id', param_id)
                .first()

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(service, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async updateMerchantService({ request, response, auth }) {
        try {
            Logger.info('request url is ' + request.url())
            const data = request.body
            const merchant = await Merchant.findBy('id', data.merchant_id)

            const target_id = data.service_id
            delete data.service_id
            delete data.merchant_id

            const service = await merchant
                .services()
                .where('id', target_id)
                .update(data)

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(service, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async getMerchantServices({ request, response, auth, transform }) {
        try {
            Logger.info('request url is ' + request.url())
            let data = request.body
            const merchant = await Merchant.findBy('id', data.merchant_id)
            delete data.email

            const services = await merchant
                .services()
                .fetch()

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(services, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async deleteMerchantService({ request, response, auth }) {
        try {
            Logger.info('request url is ' + request.url())
            let data = request.body
            const service = await MerchantService.query().where('id', data.service_id).delete()

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(service, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

}

module.exports = ServiceController
