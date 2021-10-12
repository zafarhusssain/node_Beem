'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up() {
    this.create('messages', (table) => {
      table.increments()
      table.integer('from_user_id').unsigned().references('id').inTable('users').defaultTo(null).onDelete('SET NULL')
      table.integer('to_user_id').unsigned().references('id').inTable('users').defaultTo(null).onDelete('SET NULL')
      table.integer('merchant_id').unsigned().references('id').inTable('merchants').defaultTo(null).onDelete('SET NULL')
      table.string('text', 4000)
      table.integer('status_id').unsigned().references('id').inTable('message_statuses').defaultTo(null).onDelete('SET NULL')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('messages')
  }
}

module.exports = MessageSchema
