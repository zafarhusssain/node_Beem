'use strict'

const Model = use('App/Models/ResponseType')
const Database = use('Database')
const Factory = use('Factory')

class ResponseTypeSeeder {
  async run () {
    var obj = [
      {
        type: 'Success',
        type_description: 'This type of response is Sucess'
      },
      {
        type: 'Error',
        type_description: 'This type of response is Error'
      },
      {
        type: 'Local Error',
        type_description: 'This type of response is Local Error'
      },
      {
        type: 'Info',
        type_description: 'This type of response is Information'
      },
      {
        type: 'SMS',
        type_description: 'This type of response is Short Message Service (SMS)'
      },
      {
        type: 'Email',
        type_description: 'This type of response is Email'
      }
      ,
      {
        type: 'Alert',
        type_description: 'This type of response is Alerting'
      },
      {
        type: 'General',
        type_description: 'This type of address is general purpose'
      },
]

await Model.createMany(obj)
  
  }
}

module.exports = ResponseTypeSeeder
