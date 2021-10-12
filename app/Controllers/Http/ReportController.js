'use strict'
const Logger = use('Logger')
const Config = use('Config')
const success = Config.get('response.success')
const error = Config.get('response.error');
const responseService = use('App/Services/ResponseService')

const Address = use('App/Models/Address')
const User = use('App/Models/User')
const commonService = use('App/Services/CommonService')
const AddressTransformer = use('App/Transformers/AddressTransformer')
const BumblebeeTransformer = use('Bumblebee/Transformer')

class AddressController {

    async createAddress({ request, response, auth }) {        
        try {
            Logger.info('request url is: ' + request.url())
            const user = await auth.getUser()
            let data = request.body
            delete data.email
            data.user_id = user.id
            const address = await Address.create(data)
            
            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(address, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async getAddress({ request, response, auth, transform  }) {        
        try {
            Logger.info('request url is ' + request.url())
            const data = request.body
            const user = await auth.getUser()
            
            const address = await Address.query()
            // .where('address_type_id', data.address_type_id)
            .where('user_id', user.id)
            .fetch()

            const re =   await transform.collection(address, AddressTransformer)
            
            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(re, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async deleteAddress({ request, response, auth }) {        
        try {
            Logger.info('request url is ' + request.url())
            const data = request.body
            const user = User.findBy('email', data.email)
            
            const address = await Address.query()
            .where('address_type_id', data.address_type_id)
            .where('user_id', user.id)
            
            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(address, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async updateAddress({ request, response, auth }) {        
        try {
            Logger.info('request url is ' + request.url())
            const data = request.body
            const user = User.findBy('email', data.email)
            
            const address = await Address.query()
            .where('address_type_id', data.address_type_id)
            .where('user_id', user.id)
            
            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(address, processedResponse.message, processedResponse.code);
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

module.exports = AddressController
