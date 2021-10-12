'use strict'

const Model = use('App/Models/InvoiceStatus')
const Database = use('Database')
const Factory = use('Factory')

class InvoiceStatusSeeder {
  async run() {
    var obj = [
      {
        name: 'Paid',
        name_description: 'Invoice is paid',
      },
      {
        name: 'Due',
        name_description: 'Invoice is due',
      },
      
    ]

    await Model.createMany(obj)
  }
}

module.exports = InvoiceStatusSeeder
