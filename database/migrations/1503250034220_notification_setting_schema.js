'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSettingSchema extends Schema {
  up() {
    this.create('notification_settings', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').nullable().defaultTo(null).onDelete('CASCADE')
      table.integer('merchant_id').unsigned().references('id').inTable('merchants').nullable().defaultTo(null).onDelete('CASCADE')
      table.boolean('push_notify').defaultTo(false)
      table.boolean('email_notify').defaultTo(false)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    });
  }

  down() {
    this.drop('notification_settings')
  }
}

module.exports = NotificationSettingSchema
