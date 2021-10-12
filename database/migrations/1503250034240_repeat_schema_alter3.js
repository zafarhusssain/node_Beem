'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepeatSchema extends Schema {
  up () {
    this.alter('repeats', (table) => {
      table.string('day_number').alter()
      table.dropColumn('time')
    })
  }

  down () {
  }
}

module.exports = RepeatSchema
