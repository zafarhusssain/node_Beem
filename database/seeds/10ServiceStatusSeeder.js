'use strict'

const Model = use('App/Models/ServiceStatus')
const Database = use('Database')
const Factory = use('Factory')

class ServiceStatusSeeder {
  async run() {
    var obj = [
      {
        name: 'Pending',
        name_description: 'This type of status is Pending',
      },
      {
        name: 'In progress',
        name_description: 'This type of status is In Progress',
      },
      {
        name: 'Completed',
        name_description: 'This type of status is Complete',
      },
      {
        name: 'Partial Completed',
        name_description: 'This type of status is Partial Complete',
      },
      {
        name: 'In Complete',
        name_description: 'This type of status is In Complete',
      },
      {
        name: 'Cancelled',
        name_description: 'This type of status is Cancelled',
      },
    ]

    await Model.createMany(obj)
  }
}

module.exports = ServiceStatusSeeder
