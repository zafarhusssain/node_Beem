'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up () {
    this.create('schedules', (table) => {
      table.increments()
      table.integer('quote_id').unsigned().references('id').inTable('quotes').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('user_id').unsigned().references('id').inTable('users').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('merchant_user_id').unsigned().references('id').inTable('users').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('merchant_id').unsigned().references('id').inTable('merchants').nullable().defaultTo(null).onDelete('SET NULL')
      table.integer('status_id').unsigned().references('id').inTable('schedule_statuses').nullable().defaultTo(1).onDelete('SET NULL')
      table.date('start_date').nullable().defaultTo(null)
      table.date('end_date').nullable().defaultTo(null)      
      table.string('time').nullable().defaultTo(null)
      table.boolean('is_repeat').defaultTo(false)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
