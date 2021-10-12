'use strict'

const Model = use('App/Models/QuoteStatus')
const Database = use('Database')
const Factory = use('Factory')

class QuoteStatusSeeder {
  async run() {
    var obj = [
      {
        name: 'Requested',
        name_description: 'Quote is Requested',
      },
      {
        name: 'Quoted',
        name_description: 'Quote is Quoted',
      },
      {
        name: 'Accepted',
        name_description: 'Quote is Accepted',
      },
      {
        name: 'Rejected',
        name_description: 'Quote is Rejected',
      },
      {
        name: 'In Peogress',
        name_description: 'Quote is work in progress',
      },
      {
        name: 'Finished',
        name_description: 'Quote is Completed',
      },
      {
        name: 'Cancelled',
        name_description: 'Quote is Cancelled',
      }

    ]

    await Model.createMany(obj)
  }
}

module.exports = QuoteStatusSeeder
