'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepeatSchema extends Schema {
  up () {
    this.create('repeats', (table) => {
      table.increments()
      table.integer('schedule_id').unsigned().references('id').inTable('schedules').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('repeat_type_id').unsigned().references('id').inTable('repeat_types').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('day_number').unsigned().nullable().defaultTo(null)
      table.string('day_name', 50).unsigned().nullable().defaultTo(null)
      table.string('time').nullable().defaultTo(null)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('repeats')
  }
}

module.exports = RepeatSchema
