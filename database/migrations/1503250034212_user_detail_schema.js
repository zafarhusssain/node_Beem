'use strict'
const Schema = use('Schema')

class UserDetailSchema extends Schema {
  up () {
    this.create('user_details', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('about_me', 1000)
      table.string('short_description', 4000)      
      table.timestamps()
    })
  }

  down () {
    this.drop('user_details')
  }
}

module.exports = UserDetailSchema
