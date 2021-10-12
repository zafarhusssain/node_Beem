'use strict'
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.string('display_picture_url_from_base64', 500)
    })
  }

  down () {
  }
}

module.exports = UserSchema
