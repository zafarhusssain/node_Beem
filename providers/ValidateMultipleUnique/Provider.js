'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

// Usage
// uniqueMultiple:users,email, id/1, is_deleted/1 ..
// OR
// uniqueMultiple:table_name,field_name igonore_fied_name/value, igonore_fied_name/value,.. 
// check uniquness for all given fields in db

class ValidateUniqueMultiple extends ServiceProvider {
  async _uniqueFn(data, field, message, args, get) {
    const Database = use('Database')
    const util = require('util')

    console.log('data: ', data, 'field: ', field, 'message: ', message, 'args: ', args, 'get: ', get)
    let ignoreIds = []

    const field_name = args[1]
    const table = args[0]
    if (args[2]) {
      for (const a of args)
        if (a.includes('/')) {
          let igonreFields = {}
          igonreFields.field = a.split('/')[0]
          igonreFields.value = a.split('/')[1]
          ignoreIds.push(igonreFields)
        }

    }

    const rows = await Database.table(table).where((builder) => {

      let value = get(data, field_name)
      builder.where(field_name, '=', value)

      if (ignoreIds) {
        for (const i of ignoreIds) {
          builder.whereNot(i.field, '=', i.value)
        }
      }
    }).count('* as total')
    console.log('result: ', rows[0])
    if (rows[0].total > 0) {
      throw message
    }
  }

  boot() {
    const Validator = use('Validator')
    Validator.extend('uniqueMultiple', this._uniqueFn, 'Must be unique')
  }
}

module.exports = ValidateUniqueMultiple