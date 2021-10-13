'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstitutionSchema extends Schema {
    up() {
        this.create('institutions', (table) => {
            table.increments()
            table.string('code', 50)
            table.string('name', 80)
            table.string('description', 254)
            table.boolean('is_active').defaultTo(true)
            table.timestamps()
        })
    }

    down() {
        this.drop('institutions')
    }
}

module.exports = InstitutionSchema