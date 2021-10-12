'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceSchema extends Schema {
  up () {
    this.create('invoices', (table) => {
      table.increments()
      table.integer('quote_id').unsigned().references('id').inTable('quotes').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('status_id').unsigned().references('id').inTable('invoice_statuses').nullable().defaultTo(2).onDelete('SET NULL')
      table.decimal('amount',14,2).nullable().defaultTo(null)
      table.integer('merchant_id').unsigned().references('id').inTable('merchants').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('user_id').unsigned().references('id').inTable('users').nullable().defaultTo(null).onDelete('SET NULL')
      table.date('generate_date').nullable().defaultTo(null)
      table.date('paid_date').nullable().defaultTo(null)
      table.text('stripe_response')
      table.string('stripe_charge_id', 1000)
      table.string('stripe_transfer_id', 1000)   
      table.string('transaction_id', 1000)   
      table.integer('card_id').unsigned().references('id').inTable('cards').nullable().defaultTo(null).onDelete('SET NULL')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('invoices')
  }
}

module.exports = InvoiceSchema
