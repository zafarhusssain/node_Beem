'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MerchantSchema extends Schema {
  up () {
    this.alter('merchants', (table) => {
      table.string('account_number', 100).nullable().defaultTo(null)
      table.string('routing_number', 100).nullable().defaultTo(null)
      table.string('hero_image_url_from_base64', 500).nullable().defaultTo(null)
      table.string('logo_url_from_base64', 500).nullable().defaultTo(null)
    })
  }

  down () {
  }
}

module.exports = MerchantSchema
