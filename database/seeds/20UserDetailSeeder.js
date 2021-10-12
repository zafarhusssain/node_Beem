'use strict'

const Factory = use('Factory')
const Database = use('Database')
const Model = use('App/Models/UserDetail')

class UserDetailSeeder {
  async run() {
    var obj =
    {
      user_id: '1',
      about_me: 'I am the Super administrator this company. I manage the users status, their ativity and payments flow',
      short_description: 'This section is for any type description for the user'
    }

    await Model.create(obj)

  }

}

module.exports = UserDetailSeeder
