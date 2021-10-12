'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressTypeSchema extends Schema {
  up () {
    this.create('address_types', (table) => {
      table.increments()
      table.string('type', 80).notNullable().unique()
      table.string('type_description', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('address_types')
  }
}

module.exports = AddressTypeSchema
