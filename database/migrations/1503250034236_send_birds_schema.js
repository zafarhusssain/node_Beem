'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SendBirdSchema extends Schema {
  up () {
    this.create('send_birds', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').nullable().defaultTo(null).onDelete('SET NULL')
      table.string('sendbird_user_id', 100)
      table.string('phone_number', 100)
      table.string('nickname', 500)
      table.string('profile_url', 4000)
      table.string('access_token', 4000)
      table.string('last_seen_at', 4000)
      table.boolean('is_online').defaultTo(false)
      table.boolean('has_ever_logged_in').defaultTo(false)
      table.boolean('is_active').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('send_birds')
  }
}

module.exports = SendBirdSchema
