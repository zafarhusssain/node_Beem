'use strict'

const Model = use('App/Models/AdminType')
const Database = use('Database')
const Factory = use('Factory')

class AdminTypeSeeder {
  async run () {
    var obj = [
      {
        type: 'Super',
        type_description: 'This type of admin is Super Adminstrator'
      },
      {
        type: 'Sub',
        type_description: 'This type of admin is Sub Adminstrator on behalf of Super Administrator'
      },
      {
        type: 'Merchant',
        type_description: 'This type of admin is Merchant Administrator'
      },
      {
        type: 'Handler',
        type_description: 'This type of admin is Merchant Sub Administrator or Handler'
      },
      {
        type: 'Provider',
        type_description: 'This type of admin is Service Provider'
      },
      {
        type: 'User',
        type_description: 'This type of admin is general user'
      },
]

await Model.createMany(obj)
  
  }
}

module.exports = AdminTypeSeeder
