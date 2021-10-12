'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MerchantServiceSchema extends Schema {
  up () {
    this.create('merchant_services', (table) => {
      table.increments()
      table.string('name', 50)
      table.text('description')
      table.decimal('amount',14,2).nullable().defaultTo(null)
      table.integer('merchant_id').unsigned().references('id').inTable('merchants').onDelete('CASCADE')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('merchant_services')
  }
}

module.exports = MerchantServiceSchema
