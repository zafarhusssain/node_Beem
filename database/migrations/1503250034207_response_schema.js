'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResponseSchema extends Schema {
  up () {
    this.create('responses', (table) => {
      table.increments()
      table.string('response_name', 100).nullable()
      table.string('response_code', 80).notNullable().unique()
      table.string('response_description', 254)
      table.string('response_message', 1000)
      table.integer('response_type_id').unsigned().references('id').inTable('response_types').nullable().defaultTo(null).onDelete('SET NULL')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('responses')
  }
}

module.exports = ResponseSchema
