'use strict'

const Factory = use('Factory')
const Model = use('App/Models/Role')
const Database = use('Database')

class RoleSeeder {
  async run () {
    var obj = [
      {
        role_name: 'Customer',
        role_code: 'PA-001',
        role_description: 'End user receiving service from a merchant'
      },
      {
        role_name: 'Merchant User',
        role_code: 'PA-002',
        role_description: 'Employee of a Merchant offering services and processing payments through Beem'
      },
      {
        role_name: 'Administrator',
        role_code: 'PA-003',
        role_description: 'Beem employee'
      },
]

await Model.createMany(obj)
  
  }
}

module.exports = RoleSeeder
