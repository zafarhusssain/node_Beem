'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AddressType extends Model {
  
      static get updatedAtColumn() {
        return 'updated_at'
      }
    
      static get createdAtColumn() {
        return 'created_at'
      }

      address () {
        return this.belongsTo('App/Model/Address')
      }

      static get hidden () {
        return ['is_active', 'created_at', 'updated_at']
      }
}

module.exports = AddressType
