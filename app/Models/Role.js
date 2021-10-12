'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {

  static get updatedAtColumn() {
    return 'updated_at'
  }

  static get createdAtColumn() {
    return 'created_at'
  }


  static get hidden () {
    return ['is_active', 'created_at', 'updated_at']
  }
  static get visible() {
    return ['id', 'role_name', 'role_code']
  }
  
}

module.exports = Role
