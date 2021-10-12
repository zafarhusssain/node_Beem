'use strict'
const Logger = use('Logger')
const Config = use('Config')
const Env = use('Env')
const success = Config.get('response.success')
const error = Config.get('response.error');
const responseService = use('App/Services/ResponseService')
const destination_id = Env.get('STRIPE_CONNECT_ACCOUNT')
const percent = Env.get('CHARGE_PERCENTAGE')

const Card = use('App/Models/Card')
const Invoice = use('App/Models/Invoice')
const User = use('App/Models/User')
const Merchant = use('App/Models/Merchant')
const commonService = use('App/Services/CommonService')
const AddressTransformer = use('App/Transformers/AddressTransformer')
const BumblebeeTransformer = use('Bumblebee/Transformer')
const Stripe = require("stripe")(Env.get('STRIPE_SECRET_KEY', 'test'))

class InvoiceController {

  async postCustomerInvoice({ request, response, auth }) {
    try {
      Logger.info('request url is: ' + request.url())
      let data = request.body

      var invoiceForId = await Invoice.query().with('merchant').where('id', data.invoice_id).first()
      invoiceForId = invoiceForId.toJSON()
      var invoice = await Invoice.query().with('merchant').where('id', data.invoice_id).first()

      var merchant_stripe_id = invoiceForId.merchant.stripe_merchant_id
      console.log('stripe merchnat id::::::=========>', merchant_stripe_id)
      let update = await Stripe.customers.update(data.customer, {
        default_source: data.card_id
      })

      console.log('default: ', update)
      var amount = invoiceForId.amount * 100
      amount = amount
      console.log('amount: ', amount)
      var charge = await Stripe.charges.create({
        amount: amount,
        currency: 'usd',
        customer: data.customer,
        description: 'Charged By Beem App',
      })

      console.log('charge: ', charge)

      if (charge.paid) {
        var total_amount = amount
        var fee_percentage = percent
        const fee = total_amount / fee_percentage

        var merchant_amount = total_amount - fee
        console.log('fee: ', fee, 'merchant_amount', merchant_amount)
        var transfer = await Stripe.transfers.create({
          amount: fee,
          currency: "usd",
          source_transaction: charge.id,
          destination: destination_id,
        })
        console.log('transfer fee: ', transfer)

        var transfer = await Stripe.transfers.create({
          amount: merchant_amount,
          currency: "usd",
          source_transaction: charge.id,
          destination: merchant_stripe_id,
        })
        console.log('transfer merchnat: ', transfer)
      }

      invoice.status_id = 1
      invoice.paid_date = new Date()
      invoice.card_id = await Card.query().where('card_token', data.card_id).id
      invoice.stripe_transfer_id = transfer.id
      invoice.stripe_charge_id = charge.id
      await invoice.save()
      // invoice.card = charge

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(invoice, processedResponse.message, processedResponse.code)
      return response.json(resp)

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getCustomerInvoices({ request, response, auth, transform }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?email=")
      const email = res[1]
      const user = await User.findBy('email', email)

      if (!user) {
        let processedResponse = await responseService.processResponse('ERR007')
        let resp = await error(processedResponse.message, processedResponse.code)
        return response.json(resp)
      }

      const invoices = await Invoice.query()
        .with('merchant')
        .with('status')
        .where('user_id', user.id)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(invoices, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getCustomerInvoice({ request, response, auth, transform, params }) {
    try {
      Logger.info('request url is ' + request.url())
      const param_id = params.id

      const invoices = await Invoice.query()
        .with('quote', (q) => q.with('services', (s) => s.with('service').with('status')))
        .with('merchant')
        .with('status')
        .where('id', param_id)
        .first()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(invoices, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }


  //merchant

  async getMerchantInvoices({ request, response, auth, transform }) {
    try {
      Logger.info('request url is ' + request.url())
      const url = request.originalUrl()
      const res = url.split("?merchant_id=")
      const merchant_id = res[1]
      const merchant = await Merchant.find(merchant_id)

      const invoices = await Invoice.query()
        .with('customer')
        .with('status')
        .where('merchant_id', merchant.id)
        .fetch()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(invoices, processedResponse.message, processedResponse.code);
      return response.json(resp);

    } catch (err) {
      // await trx.rollback();
      await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
      let processedResponse = await responseService.processResponse(err.code, true, err)
      let resp = await error(processedResponse.message, processedResponse.code)
      return resp
    }
  }

  async getMerchantInvoice({ request, response, auth, transform, params }) {
    try {
      Logger.info('request url is ' + request.url())
      const param_id = params.id
      const invoices = await Invoice.query()
        .with('quote', (q) => q.with('services', (s) => s.with('service').with('status')))
        .with('customer')
        .with('status')
        .where('id', param_id)
        .first()

      let processedResponse = await responseService.processResponse('MSG000')
      let resp = await success(invoices, processedResponse.message, processedResponse.code);
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

module.exports = InvoiceController
