'use strict'

const Model = use('App/Models/AddressType')
const Database = use('Database')
const Factory = use('Factory')

class AddressTypeSeeder {
  async run () {
    var obj = [
      {
        type: 'Home',
        type_description: 'This type of address is Home Address of user'
      },
      {
        type: 'Work',
        type_description: 'This type of address is Work Address of user'
      },
      {
        type: 'Rental Property',
        type_description: 'This type of address is rental property of user'
      },
      {
        type: 'Card',
        type_description: 'This type of address is Payment Card Address of user'
      },
      {
        type: 'Merchant',
        type_description: 'This type of address is Merchant entity address'
      },
]

await Model.createMany(obj)
  
  }
}

module.exports = AddressTypeSeeder
