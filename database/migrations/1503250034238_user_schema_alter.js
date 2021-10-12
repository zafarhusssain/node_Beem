'use strict'
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.text('display_picture_base64').alter()
    })
  }

  down () {
  }
}

module.exports = UserSchema
