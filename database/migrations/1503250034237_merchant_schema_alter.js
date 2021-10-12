'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MerchantSchema extends Schema {
  up () {
    this.alter('merchants', (table) => {
      table.string('stripe_merchant_id', 100).nullable().defaultTo(null)
      table.string('ssn_last_4', 10).nullable().defaultTo(null)
      table.string('owner_name', 100).nullable().defaultTo(null)
      table.string('dob', 100).nullable().defaultTo(null)
      table.text('hero_image_base64').nullable().defaultTo(null)
      table.text('logo_base64').nullable().defaultTo(null)
    })
  }

  down () {
  }
}

module.exports = MerchantSchema
