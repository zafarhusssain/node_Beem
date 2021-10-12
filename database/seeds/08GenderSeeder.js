'use strict'

const Model = use('App/Models/Gender')
const Database = use('Database')
const Factory = use('Factory')

class GenderSeeder {
  async run () {
    var obj = [
      {
        name: 'Male',
        name_description: 'This type of gender is male'
      },
      {
        name: 'Female',
        name_description: 'This type of gender is female'
      },
      {
        name: 'Other',
        name_description: 'This type of gender is not defined by user'
      }
]

await Model.createMany(obj)
  
  }
}

module.exports = GenderSeeder
