'use strict'

const Model = use('App/Models/MessageStatus')
const Database = use('Database')
const Factory = use('Factory')

class MessageStatusSeeder {
  async run() {
    var obj = [
      {
        type: 'Open',
        type_description: 'This type of status is Open',
      },
      {
        type: 'Closed',
        type_description: 'This type of status is Closed',
      },
      {
        type: 'Pending',
        type_description: 'This type of status is Pending',
      },
    ]

    await Model.createMany(obj)
  }
}

module.exports = MessageStatusSeeder
