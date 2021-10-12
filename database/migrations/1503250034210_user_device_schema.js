'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserDeviceSchema extends Schema {
  up () {
    this.create('user_devices', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('device_name', 80)
      table.string('device_type', 20)
      table.string('imei', 100)
      table.string('device_token', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_devices')
  }
}

module.exports = UserDeviceSchema
