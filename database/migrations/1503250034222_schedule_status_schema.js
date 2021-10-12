'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleStatusSchema extends Schema {
  up () {
    this.create('schedule_statuses', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('name_description', 254)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('schedule_statuses')
  }
}

module.exports = ScheduleStatusSchema
