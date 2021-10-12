'use strict'

const Model = use('App/Models/CardType')
const Database = use('Database')
const Factory = use('Factory')

class CardTypeSeeder {
  async run () {
    var obj = [
      {
        type: 'Visa',
        type_description: 'This is Visa type'
      },
      {
        type: 'Mastercard',
        type_description: 'This is Mastercard type'
      },
      {
        type: 'American Express',
        type_description: 'This is American Express type'
      },
      {
        type: 'Discover',
        type_description: 'This is Discover type'
      },
      {
        type: 'Diners Club',
        type_description: 'This is Diners Club type'
      },
      {
        type: 'JCB',
        type_description: 'This is JCB type'
      },
      {
        type: 'UnionPay',
        type_description: 'This is UnionPay type'
      },
]

await Model.createMany(obj)

  }
}

module.exports = CardTypeSeeder
