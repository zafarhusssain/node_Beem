'use strict'

const Schema = use('Schema')

class CardSchema extends Schema {
  up () {
    this.create('cards', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('card_type_id').unsigned().references('id').inTable('card_types').nullable().defaultTo(null).onDelete('SET NULL')
      table.string('card_name', 254)
      table.string('card_brand', 254)
      table.string('card_token', 254)
      table.string('card_fingerprint', 254)
      table.string('customer', 254)
      table.string('last4', 254)
      table.string('exp_month', 254)
      table.string('exp_year', 254)
      table.string('first_name', 254)
      table.string('middle_name', 254)
      table.string('last_name', 254)
      table.string('name_on_the_card', 254)
      table.string('address1', 254)
      table.string('address2', 254)
      table.string('city', 50)
      table.string('state', 20)
      table.string('zip_code', 15)
      table.string('address_country', 50)
      table.string('country', 50)
      table.boolean('is_active').defaultTo(true)
      table.integer('address_id').unsigned().references('id').inTable('addresses').nullable().defaultTo(null).onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('cards')
  }
}

module.exports = CardSchema
