'use strict'

const Model = use('Model')

class SendBird extends Model {

      static get updatedAtColumn() {
        return 'updated_at'
      }

      static get createdAtColumn() {
        return 'created_at'
      }


}

module.exports = SendBird
