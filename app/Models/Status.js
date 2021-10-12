'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Status extends Model {

  static get updatedAtColumn() {
    return 'updated_at'
  }

  static get createdAtColumn() {
    return 'created_at'
  }
  static get hidden() {
    return ['is_active', 'created_at', 'updated_at']
  }
  static get visible() {
    return ['id', 'status_name', 'status_code']
  }
}

module.exports = Status
