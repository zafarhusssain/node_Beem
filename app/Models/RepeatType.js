'use strict'

const Model = use('Model')

class RepeatType extends Model {

  static get updatedAtColumn() {
    return 'updated_at'
  }

  static get createdAtColumn() {
    return 'created_at'
  }

  static get hidden() {
    return ['is_active', 'created_at', 'updated_at', 'type_description']
  }
}

module.exports = RepeatType
