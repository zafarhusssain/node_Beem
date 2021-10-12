'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

// Usage
// uniqueCompound:table_name,field_name1/field_name2/field_name3/..
// OR
// unique_compound:table_name,field_name1/field_name2/field_name3/.. 
// check uniquness for all given fields in db

class ValidateUniqueCompound extends ServiceProvider {
  async _uniqueFn (data, field, message, args, get) {
    const Database = use('Database')
    const util = require('util')

    let ignoreId = null
    const fields = args[1].split('/')
    const table = args[0]
    if (args[2]) {
      ignoreId = args[2]
    }

    const rows = await Database.table(table).where((builder) => {
      for (const f of fields) {
        let value = get(data, f)
        builder.where(f, '=', value)
      }
      if (ignoreId) {
        builder.whereNot('id', '=', ignoreId)
      }
    }).count('* as total')

    if (rows[0].total) {
      throw message
    }
  }

  boot () {
    const Validator = use('Validator')
    Validator.extend('uniqueCompound', this._uniqueFn, 'Must be unique')
  }
}

module.exports = ValidateUniqueCompound