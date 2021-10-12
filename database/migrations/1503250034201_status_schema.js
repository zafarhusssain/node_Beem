'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up () {
    this.create('statuses', (table) => {
      table.increments()
      table.string('status_name', 50)
      table.string('status_code', 80).notNullable().unique()
      table.string('status_description', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
