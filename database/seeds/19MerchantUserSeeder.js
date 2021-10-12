'use strict'

const Factory = use('Factory')
const Database = use('Database')
const Model = use('App/Models/MerchantUser')

class MerchantUserSeeder {
  async run() {
    var obj = [

    // {
    //   user_id: 5,
    //   merchant_id: 1
    // },
    // {
    //   user_id: 6,
    //   merchant_id: 2
    // }

  ]

    await Model.createMany(obj)

  }

}

module.exports = MerchantUserSeeder
