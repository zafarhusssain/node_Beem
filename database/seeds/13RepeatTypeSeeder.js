'use strict'

const Model = use('App/Models/RepeatType')
const Database = use('Database')
const Factory = use('Factory')

class RepeatTypeSeeder {
  async run() {
    var obj = [
      {
        type: 'None',
        type_description: 'This is none',
      },
      {
        type: 'Daily',
        type_description: 'This is Daily',
      },
      {
        type: 'Weekly',
        type_description: 'This is weekly',
      },
      {
        type: 'Bimonthly',
        type_description: 'This is twice a month',
      },
      {
        type: 'Monthly',
        type_description: 'This is monthly',
      },
      {
        type: 'Quarterly',
        type_description: 'Every 4th month',
      },
      {
        type: 'Biannual',
        type_description: 'This is twice a year',
      },
      {
        type: 'Yearly',
        type_description: 'This is a year',
      },
    ]

    await Model.createMany(obj)
  }
}

module.exports = RepeatTypeSeeder
