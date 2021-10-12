'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MerchantSchema extends Schema {
  up () {
    this.create('merchants', (table) => {
      table.increments()
      table.string('business_name', 254)
      table.string('email', 254)
      table.string('phone_number', 254)
      table.text('description')
      table.string('hero_image', 1000)
      table.string('address_id', 1000)
      table.string('logo', 1000)
      table.boolean('is_active').defaultTo(true)
      table.boolean('is_deleted').defaultTo(false)
      table.timestamp('deleted_at').defaultTo(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('merchants')
  }
}

module.exports = MerchantSchema
