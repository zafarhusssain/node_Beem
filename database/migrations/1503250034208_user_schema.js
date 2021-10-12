'use strict'
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).defaultTo(null)
      table.integer('role_id').unsigned().references('id').inTable('roles').nullable().defaultTo(null).onDelete('SET NULL')
      table.string('display_picture_url', 500)
      table.string('display_picture_base64', 4000)
      table.string('title', 50)
      table.string('first_name', 50)
      table.string('middle_name', 50)
      table.string('last_name', 50)
      table.date('dob').nullable().defaultTo(null)
      table.integer('gender_id').unsigned().references('id').inTable('genders').nullable().defaultTo(null).onDelete('SET NULL')
      table.string('phone_number', 50)
      table.string('email', 254).notNullable().index()
      table.string('password', 254).notNullable()
      table.integer('status_id').unsigned().references('id').inTable('statuses').nullable().defaultTo(1).onDelete('SET NULL')
      table.boolean('is_admin').defaultTo(false)
      table.integer('admin_type_id', 20).unsigned().references('id').inTable('admin_types').defaultTo(null).onDelete('SET NULL')
      table.string('stripe_customer_id', 100).nullable().defaultTo(null)
      table.boolean('is_active').defaultTo(true)
      table.boolean('is_deleted').defaultTo(false)
      table.boolean('is_verified').defaultTo(false)
      table.datetime('verified_at').nullable().defaultTo(null)
      table.timestamp('deleted_at').defaultTo(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
