'use strict'

const Model = use('Model')

class UserDevice extends Model {

      static get updatedAtColumn() {
        return 'updated_at'
      }
    
      static get createdAtColumn() {
        return 'created_at'
      }

      
}

module.exports = UserDevice
