'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuoteServiceSchema extends Schema {
  up () {
    this.create('quote_services', (table) => {
      table.increments()
      table.integer('quote_id').unsigned().references('id').inTable('quotes').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('service_id').unsigned().references('id').inTable('merchant_services').nullable().defaultTo(null).onDelete('SET NULL')
      table.text('notes').nullable().defaultTo(null)
      table.integer('status_id').unsigned().references('id').inTable('service_statuses').nullable().defaultTo(1).onDelete('SET NULL')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('quote_services')
  }
}

module.exports = QuoteServiceSchema
