'use strict'

const Model = use('App/Models/Merchant')
const Database = use('Database')
const Factory = use('Factory')

class MerchantSeeder {
  async run() {
    var obj = [
      {
        email : 'pool@yopmail.com',
        business_name: 'Pool Company',
        phone_number: '+1499887766',
        description: 'We are pool cleaning service provider in your area. We offer lots of services which are mentioned below, We can be reached through this application, or contact us on our numbers.',
        hero_image: 'images/merchants/pool-hero.jpg',
        address_id: 1,
        logo: 'images/merchants/pool-logo.jpg'
      },
      {
        email : 'cleaners@yopmail.com',
        business_name: 'Cleaners Pool',
        phone_number: '+1499887755',
        description: 'We are new pool cleaning company in your imediate area. We offer lots of services which are mentioned below, We can be reached through this application, or contact us on our numbers.',
        hero_image: 'images/merchants/cleaner-hero.jpg',
        address_id: 2,
        logo: 'images/merchants/cleaner-logo.jpg'
      }
    ]

    await Model.createMany(obj)
  }
}

module.exports = MerchantSeeder
