'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MerchantUserSchema extends Schema {
  up () {
    this.create('merchant_users', (table) => {
      table.increments()
      table.integer('merchant_id').unsigned().references('id').inTable('merchants').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('merchant_users')
  }
}

module.exports = MerchantUserSchema
