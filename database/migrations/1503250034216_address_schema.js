'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('merchant_id').unsigned().references('id').inTable('merchants').onDelete('CASCADE')
      table.integer('address_type_id').unsigned().references('id').inTable('address_types').nullable().defaultTo(null).onDelete('SET NULL')
      table.string('address_name', 254).nullable().defaultTo(null)
      table.string('address1', 254)
      table.string('address2', 254)
      table.string('city', 50)
      table.string('state', 20)
      table.string('zip_code', 15)
      table.string('country', 20)
      table.string('security_code', 100)
      table.string('longitude', 100)
      table.string('latitude', 100)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
