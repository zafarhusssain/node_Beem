'use strict'

const Model = use('App/Models/ScheduleStatus')
const Database = use('Database')
const Factory = use('Factory')

class ScheduleStatusSeeder {
  async run() {
    var obj = [
      {
        name: 'Confirmed',
        name_description: 'Appointment is confirmed or scheduled',
      },
      {
        name: 'Started',
        name_description: 'Appointment is Started',
      },
      {
        name: 'Completed',
        name_description: 'Appointment is Completed',
      },
      {
        name: 'Cancelled',
        name_description: 'Appointment is cancelled',
      },
      {
        name: 'Pending',
        name_description: 'This type of status is Pending',
      },
    ]

    await Model.createMany(obj)
  }
}

module.exports = ScheduleStatusSeeder
