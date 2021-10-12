"use strict";
const Logger = use("Logger");
const Config = use("Config");
const success = Config.get("response.success");
const error = Config.get("response.error");
const responseService = use("App/Services/ResponseService");

const Message = use("App/Models/Message");
const User = use("App/Models/User");
const commonService = use("App/Services/CommonService");

class MessageController {
    async createMessage({ request, response, auth }) {
        try {
            Logger.info("request url is: " + request.url());
            const user = await auth.getUser();
            let data = request.body;
            delete data.email;
            data.user_id = user.id;
            const address = await Address.create(data);

            let processedResponse = await responseService.processResponse("MSG000");
            let resp = await success(
                address,
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

    async getMessage({ request, response, auth }) {
        try {
            Logger.info("request url is " + request.url());
            const data = request.body;
            console.log(data.email);
            // const user = await User.findBy('email', data.email);
            const user = await auth.getUser()

            console.log(user.email);


            const address = await Message.query()
                //.where("address_type_id", user.address_type_id)
                .where('from_user_id', user.id).fetch();

            let processedResponse = await responseService.processResponse("MSG000");
            let resp = await success(
                address,
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

    async deleteMessage({ request, response, auth }) {
        try {
            Logger.info("request url is " + request.url());
            const data = request.body;
            const user = User.findBy("email", request.body.email);

            const address = await Message.query()
                .where("address_type_id", data.address_type_id)
                .where("user_id", user.id);

            let processedResponse = await responseService.processResponse("MSG000");
            let resp = await success(
                address,
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

    async updateMessage({ request, response, auth }) {
        try {
            Logger.info("request url is " + request.url());
            const data = request.body;
            const user = User.findBy("email", data.email);

            const address = await Message.query()
                .where("address_type_id", data.address_type_id)
                .where("user_id", user.id);

            let processedResponse = await responseService.processResponse("MSG000");
            let resp = await success(
                address,
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

module.exports = MessageController;