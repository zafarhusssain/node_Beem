'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageStatusSchema extends Schema {
  up() {
    this.create('message_statuses', (table) => {
      table.increments()
      table.string('type', 80).notNullable().unique()
      table.string('type_description', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('message_statuses')
  }
}

module.exports = MessageStatusSchema
