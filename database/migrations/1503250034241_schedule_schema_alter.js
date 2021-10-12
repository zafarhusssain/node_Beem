'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up () {
    this.alter('schedules', (table) => {
      table.integer('status_id').defaultTo(5).alter()
      table.dropColumn('time')
      table.string('start_time').nullable().defaultTo(null)
      table.string('end_time').nullable().defaultTo(null)
      table.string('start_notes', 2000).nullable().defaultTo(null)
      table.string('stop_notes', 2000).nullable().defaultTo(null)
      table.date('initial_date').nullable().defaultTo(null)
    })
  }

  down () {
  }
}

module.exports = ScheduleSchema
