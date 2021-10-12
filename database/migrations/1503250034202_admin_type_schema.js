'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminTypeSchema extends Schema {
  up () {
    this.create('admin_types', (table) => {
      table.increments()
      table.string('type', 80).notNullable().unique()
      table.string('type_description', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('admin_types')
  }
}

module.exports = AdminTypeSchema
