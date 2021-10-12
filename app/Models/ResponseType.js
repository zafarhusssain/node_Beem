'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ResponseType extends Model {
    // static get primaryKey() {
    //     return 'address_type_id'
    //   }
      static get updatedAtColumn() {
        return 'updated_at'
      }
    
      static get createdAtColumn() {
        return 'created_at'
      }
      static get hidden () {
        return ['is_active', 'created_at', 'updated_at']
      }
}

module.exports = ResponseType
