'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GenderSchema extends Schema {
  up () {
    this.create('genders', (table) => {
      table.increments()
      table.string('name', 50).notNullable().unique()
      table.string('name_description', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('genders')
  }
}

module.exports = GenderSchema
