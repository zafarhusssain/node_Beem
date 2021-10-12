'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceStatusSchema extends Schema {
  up () {
    this.create('invoice_statuses', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('name_description', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('invoice_statuses')
  }
}

module.exports = InvoiceStatusSchema
