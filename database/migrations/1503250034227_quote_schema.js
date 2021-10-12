'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuoteSchema extends Schema {
  up () {
    this.create('quotes', (table) => {
      table.increments()
      table.datetime('quote_date').nullable().defaultTo(null)
      table.datetime('issue_date').nullable().defaultTo(null)
      table.integer('status_id').unsigned().references('id').inTable('quote_statuses').nullable().defaultTo(1).onDelete('SET NULL')
      table.integer('user_id').unsigned().references('id').inTable('users').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('customer_address_id').unsigned().references('id').inTable('addresses').nullable().defaultTo(null).onDelete('SET NULL')
      table.text('customer_description').nullable().defaultTo(null)
      table.integer('merchant_user_id').unsigned().references('id').inTable('users').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('merchant_id').unsigned().references('id').inTable('merchants').nullable().defaultTo(null).onDelete('SET NULL')
      table.text('merchant_description').nullable().defaultTo(null)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('quotes')
  }
}

module.exports = QuoteSchema
