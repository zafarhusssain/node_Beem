'use strict'

const Env = use('Env');
const Stripe = require("stripe")(Env.get('STRIPE_SECRET_KEY', 'test'))
const Config = use('Config')
const db_response = Config.get('response.dbOperation');

class PaymentService {
  async  createConnectAccount(data) {
    try {

      const bank_token = await Stripe.tokens.create({
        bank_account: {
          country: 'US',
          currency: 'usd',
          account_holder_name: data.merchant.owner_name,
          account_holder_type: 'individual',
          routing_number: data.bank.routing_number,
          account_number: data.bank.account_number,
        },
      });

      var address = {};

      let dob = data.merchant.dob.split("-");
      var year = dob[0];
      var month = dob[1];
      var date = dob[2];
      address.line1 = data.address.address1;
      address.city = data.address.city;
      address.postal_code = data.address.zip_code;
      address.state = data.address.state;

      const account = await Stripe.accounts.create({
        type: "custom",
        country: "US",
        default_currency: "USD",
        business_type: 'individual',
        business_profile: {
          name: data.merchant.business_name,
          mcc: 5734,
          product_description: data.merchant.description,
        },
        requested_capabilities: ['card_payments', 'transfers'],
        tos_acceptance: {
          date: new Date(),
          ip: '192.168.1.1',
        },
        business_type: 'individual',
        individual: {
          first_name: data.merchant.owner_name,
          last_name: data.merchant.owner_name,
          email: data.merchant.email,
          phone: data.merchant.phone_number,
          dob: {
            day: date,
            month: month,
            year: year
          },
          address: address,
          ssn_last_4: data.merchant.ssn_last_4,

        },
      });

      const bankAccount = await Stripe.accounts.createExternalAccount(
        account.id,
        {
          external_account: bank_token.id,
        }
      );

      let resp = await db_response(true, account.id);
      return resp

    } catch (err) {
      console.log('Err - PaymentService ' + err);
      let resp = await db_response(false, err);
      return resp
    }
  }
}


const paymentService = new PaymentService()
module.exports = paymentService
