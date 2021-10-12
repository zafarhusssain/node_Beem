'use strict'

const Model = use('App/Models/MerchantService')
const Database = use('Database')
const Factory = use('Factory')

class MerchantServiceSeeder {
  async run() {
    var obj = [
      // {
      //   merchant_id: 1,
      //   name: 'Caring Service',
      //   description: 'This is high priority service',
      //   amount: 230.00
      // },
      // {
      //   merchant_id: 1,
      //   name: 'Pool Service',
      //   description: 'This is high priority service',
      //   amount: 30.45
      // },
      // {
      //   merchant_id: 1,
      //   name: 'Lobby Service',
      //   description: 'This is high priority service',
      //   amount: 23.00
      // },
      // {
      //   merchant_id: 1,
      //   name: 'Saving the world',
      //   description: 'This is high priority service',
      //   amount: 50.15

      // },
      // {
      //   merchant_id: 1,
      //   name: 'Pool Cleaning',
      //   description: 'This is medium priority service',
      //   amount: 110.00
      // },
      // {
      //   merchant_id: 1,
      //   name: 'Pool Refilling',
      //   description: 'This is medium priority service',
      //   amount: 20.00
      // },
      // {
      //   merchant_id: 1,
      //   name: 'Pool Checking',
      //   description: 'This is medium priority service',
      //   amount: 200.00
      // },
      // {
      //   merchant_id: 1,
      //   name: 'Chlorine Filter',
      //   description: 'This is medium priority service',
      //   amount: 5.90
      // },
      // {
      //   merchant_id: 1,
      //   name: 'Shadding',
      //   description: 'This is medium priority service',
      //   amount: 17.00
      // },
      // {
      //   merchant_id: 2,
      //   name: 'Lawn Care',
      //   description: 'This is high priority service',
      //   amount: 78.00
      // },
      // {
      //   merchant_id: 2,
      //   name: 'Pool Care',
      //   description: 'This is high priority service',
      //   amount: 300.00
      // },
      // {
      //   merchant_id: 2,
      //   name: 'Garden Care',
      //   description: 'This is high priority service',
      //   amount: 20.80
      // },
      // {
      //   merchant_id: 2,
      //   name: 'Cleaning Pool',
      //   description: 'This is high priority service',
      //   amount: 150.00
      // },
      // {
      //   merchant_id: 2,
      //   name: 'Pool Cleaning',
      //   description: 'This is medium priority service',
      //   amount: 280.00
      // },
      // {
      //   merchant_id: 2,
      //   name: 'Pool Refilling',
      //   description: 'This is medium priority service',
      //   amount: 90.00
      // },
      // {
      //   merchant_id: 2,
      //   name: 'Pool Checking',
      //   description: 'This is medium priority service',
      //   amount: 230.00
      // },
      // {
      //   merchant_id: 2,
      //   name: 'Chlorine Filter',
      //   description: 'This is medium priority service',
      //   amount: 210.00
      // },
      // {
      //   merchant_id: 2,
      //   name: 'Shadding',
      //   description: 'This is medium priority service',
      //   amount: 235.50
      // }

    ]

    await Model.createMany(obj)
  }
}

module.exports = MerchantServiceSeeder
