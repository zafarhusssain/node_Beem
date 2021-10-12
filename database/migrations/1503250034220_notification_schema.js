'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up() {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').nullable().defaultTo(null).onDelete('CASCADE')
      table.integer('merchant_user_id').unsigned().references('id').inTable('users').nullable().defaultTo(null).onDelete('CASCADE')
      table.integer('merchant_id').unsigned().references('id').inTable('merchants').nullable().defaultTo(null).onDelete('CASCADE')
      table.text('text')
      table.boolean('is_delivered').defaultTo(false)
      table.boolean('is_seen').defaultTo(false)
      table.string('description', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    });
  }

  down() {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
