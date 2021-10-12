'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleServiceSchema extends Schema {
  up () {
    this.create('schedule_services', (table) => {
      table.increments()
      table.integer('schedule_id').unsigned().references('id').inTable('schedules').nullable().defaultTo(null).onDelete('CASCADE')
      table.integer('service_id').unsigned().references('id').inTable('merchant_services').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('status_id').unsigned().references('id').inTable('service_statuses').nullable().defaultTo(1).onDelete('SET NULL')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('schedule_services')
  }
}

module.exports = ScheduleServiceSchema
