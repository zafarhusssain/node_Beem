'use strict'

const Factory = use('Factory')
const Model = use('App/Models/Status')

class StatusSeeder {
  async run () {
    var obj = [
      {
        status_name: 'Active',
        status_code: 'ST-001',
        status_description: 'User login is allowed, and all relevant actions are allowed'
      },
      {
        status_name: 'Inactive',
        status_code: 'ST-002',
        status_description: 'User login is blocked. User is not allowed to reset password or perform any actions'
      },
      {
        status_name: 'Reset Password',
        status_code: 'ST-003',
        status_description: 'User has requested a password reset, a temporary password has been issued, user has not yet completed the password reset process'
      },
]

await Model.createMany(obj)
  }
}

module.exports = StatusSeeder
