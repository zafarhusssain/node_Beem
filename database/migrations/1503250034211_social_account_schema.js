'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialAccountSchema extends Schema {
  up () {
    this.create('social_accounts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('social_id', 80)
      table.string('social_type', 20)
      table.string('social_token', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('social_accounts')
  }
}

module.exports = SocialAccountSchema
