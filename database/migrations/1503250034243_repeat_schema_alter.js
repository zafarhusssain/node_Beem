'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepeatSchema extends Schema {
  up () {
    this.alter('repeats', (table) => {
      table.string('tentative_start_time').nullable().defaultTo(null)
      table.string('tentative_end_time').nullable().defaultTo(null)
    })
  }

  down () {
  }
}

module.exports = RepeatSchema
