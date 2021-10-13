'use strict'

const User = use('App/Models/User');
const Institution = use('App/Models/Institution');
const Role = use('App/Models/Role');
const userService = use('App/Services/UserService')
const Logger = use('Logger')
const Database = use('Database')
const Config = use('Config');
const success = Config.get('response.success');
const error = Config.get('response.error');
const responseService = use('App/Services/ResponseService')
const commonService = use('App/Services/CommonService')
var fs = require('fs');

const Helpers = use('Helpers')
const public_path = Helpers.publicPath()


class InstitutionController {

    async getInstitution({ response, auth, request, session }) {
        try {
            // const users = await User.all();
            const users = await Institution
                .query()
                .fetch();

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(users.toJSON(), processedResponse.message, processedResponse.code);
            return response.json(resp);
        } catch (err) {
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }


    async createInstitution({ request, response, auth }) {
        try {

            Logger.info("request url is: " + request.url());
            let data = request.body;
            const institution = await Institution.create(data);

            let processedResponse = await responseService.processResponse("MSG000");
            let resp = await success(
                institution,
                processedResponse.message,
                processedResponse.code
            );
            return response.json(resp);
        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(
                this.constructor.name,
                new Error(),
                err.message,
                err
            );
            let processedResponse = await responseService.processResponse(
                err.code,
                true,
                err
            );
            let resp = await error(processedResponse.message, processedResponse.code);
            return resp;
        }
    }

    async updateInstitution({ request, response, auth }) {
        try {
            Logger.info("request url is " + request.url());
            const data = request.body;
            const institution = await Institution.query()
                .where('id', data.id)
                .update({
                    name: data.name,
                    description: data.description
                });

            let processedResponse = await responseService.processResponse("MSG000");
            let resp = await success(
                institution,
                processedResponse.message,
                processedResponse.code
            );
            return response.json(resp);
        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(
                this.constructor.name,
                new Error(),
                err.message,
                err
            );
            let processedResponse = await responseService.processResponse(
                err.code,
                true,
                err
            );
            let resp = await error(processedResponse.message, processedResponse.code);
            return resp;
        }
    }


}

module.exports = InstitutionController