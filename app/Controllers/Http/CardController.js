'use strict'
const Logger = use('Logger')
const Config = use('Config')
const success = Config.get('response.success')
const error = Config.get('response.error');
const responseService = use('App/Services/ResponseService')

const paymentService = use('App/Services/PaymentService')
const Card = use('App/Models/Card')
const User = use('App/Models/User')
const commonService = use('App/Services/CommonService')
const Env = use('Env')
const Stripe = require("stripe")(Env.get('STRIPE_SECRET_KEY', 'test'))

class CardController {

    async createCard({ request, response, auth }) {
        try {
            Logger.info('request url is ' + request.url())
            const data = request.body

            const user = await User.findBy('email', data.email)

            if (!user) {
                let processedResponse = await responseService.processResponse('ERR007')
                let resp = await error(processedResponse.message, processedResponse.code)
                return response.json(resp)
            }

            var stripe_customer_id = user.stripe_customer_id

            var card_token = await Stripe.tokens.create({
                card: {
                    number: data.card_number, //'4000056655665556',
                    exp_month: data.exp_month,
                    exp_year: data.exp_year,
                    cvc: data.cvc,
                    // currency: data.currency,
                    name: data.first_name + ' ' + data.last_name,
                    address_line1: data.address1,
                    address_line2: data.address2,
                    address_city: data.city,
                    address_state: data.state,
                    address_zip: data.zip_code
                }
            })
            console.log('Card token', card_token)
            if (!stripe_customer_id) {
                if (card_token) {
                    var customer = await Stripe.customers.create({
                        email: data.email
                    })
                    console.log('customer', customer)
                    stripe_customer_id = customer.id

                    user.stripe_customer_id = customer.id
                    await user.save()
                }
            }


            if (stripe_customer_id) {
                var card_res = await Stripe.customers.createSource(
                    stripe_customer_id,
                    { source: card_token.id },
                )
                console.log('card', card_res)
            }
            let card_data = {
                user_id: user.id,
                card_name: data.card_name,
                card_brand: card_res.brand,
                card_token: card_res.id,
                card_fingerprint:card_res.fingerprint,
                customer: card_res.customer,
                last4: card_res.last4,
                exp_month: card_res.exp_month,
                exp_year: card_res.exp_year,
                name_on_the_card: card_res.name,
                address1: card_res.address_line1,
                address2: card_res.address_line2,
                city: card_res.address_city,
                state: card_res.address_state,
                zip_code: card_res.address_zip,
                address_country: card_res.address_country,
                country: card_res.country,
            }
            const card = await Card.create(card_data)

            console.log('card created:' , card)

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(card, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async getCard({ request, response, auth, params }) {
        try {
            Logger.info('request url is ' + request.url())
            const id = params.id
            const card = await Card.find(id)

            console.log('card: ', card)

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(card, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async getCardList({ request, response, auth }) {
        try {
            Logger.info('request url is ' + request.url())
            Logger.info('request url is ' + request.url())
            const url = request.originalUrl()
            const res = url.split("?email=")
            const email = res[1]
            const user = await User.findBy('email', email)
            const cards = await user
                .cards()
                .fetch()

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(cards, processedResponse.message, processedResponse.code);
            return response.json(resp);

        } catch (err) {
            // await trx.rollback();
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            let processedResponse = await responseService.processResponse(err.code, true, err)
            let resp = await error(processedResponse.message, processedResponse.code)
            return resp
        }
    }

    async deleteCard({ request, response, auth }) {
        try {
            Logger.info('request url is ' + request.url())
            const data = request.body
            const card = await Card.findBy('card_token', data.card_id)
            if(card){
                const deleted = await Stripe.customers.deleteSource(
                    card.customer,
                    card.card_token
                  )
                  await card.delete()
            }  

            let processedResponse = await responseService.processResponse('MSG000')
            let resp = await success(card, processedResponse.message, processedResponse.code);
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

module.exports = CardController
