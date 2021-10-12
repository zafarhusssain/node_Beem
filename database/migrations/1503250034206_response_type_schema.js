'use strict'

const Schema = use('Schema')

class ResponseTypeSchema extends Schema {
  up () {
    this.create('response_types', (table) => {
      table.increments()
      table.string('type', 80).notNullable().unique()
      table.string('type_description', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('response_types')
  }
}

module.exports = ResponseTypeSchema
