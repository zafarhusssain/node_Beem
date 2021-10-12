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
            let data = request.body
            const user = await User.findBy('email', data.email)
            delete data.email
                //data.user_id = user.id
            const address = await user.addresses().create(data)
                // const address = await Address.create(data)

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

    // async getAddress({ request, response, auth, transform, params }) {
    //     try {
    //         Logger.info('request url is ' + request.url())
    //             //const param_id = params.id
    //             //const address = await Address.find(param_id)

    //         // const re =   await transform.item(address, AddressTransformer)
    //         // const re =   await transform.collection(address, AddressTransformer)

    //         const data = request.body;
    //         console.log(data.email);
    //         // const user = await User.findBy('email', data.email);
    //         const user = await auth.getUser()

    //         console.log(user.email);


    //         const address = await Address.query()
    //             // .where("address_type_id", user.address_type_id)
    //             .where('user_id', user.id).fetch();

    //         let processedResponse = await responseService.processResponse('MSG000')
    //         let resp = await success(address, processedResponse.message, processedResponse.code);
    //         return response.json(resp);

    //     } catch (err) {
    //         // await trx.rollback();
    //         await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
    //         let processedResponse = await responseService.processResponse(err.code, true, err)
    //         let resp = await error(processedResponse.message, processedResponse.code)
    //         return resp
    //     }
    // }

    async updateAddress({ request, response, auth }) {
        try {
            Logger.info('request url is ' + request.url())
            const data = request.body
            const user = await User.findBy('email', data.email)

            const target_id = data.address_id
            delete data.email
            delete data.address_id

            const address = await user
                .addresses()
                .where('id', target_id)
                .update(data)

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

    async getAddresses({ request, response, auth, transform, params }) {
        try {
            Logger.info('request url is ' + request.url())
                // const url = request.originalUrl()
                // const res = url.split("?email=")
                // const email = res[1]
                // const user = await User.findBy('email', email)
                // const addresses = await user
                //     .addresses()
                //     .fetch()

            const data = request.body;
            console.log(data.email);
            // const user = await User.findBy('email', data.email);
            const user = await auth.getUser()

            console.log(user.email);


            const address = await Address.query()
                // .where("address_type_id", user.address_type_id)
                .where('user_id', user.id).fetch();


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

    async deleteAddress({ request, response, auth }) {
        try {
            Logger.info('request url is ' + request.url())
            let data = request.body
            const user = await User.findBy('email', data.email)

            if (!user) {
                let processedResponse = await responseService.processResponse('ERR007')
                let resp = await error(processedResponse.message, processedResponse.code)
                return response.json(resp)
            }

            var address = await user.addresses().where('id', data.address_id).first()
            if (address) {
                await address.delete()
            }


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