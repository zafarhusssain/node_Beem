'use strict'

const Model = use('Model')

class CardType extends Model {
  
  static get hidden() {
    return ['is_active', 'created_at', 'updated_at']
  }
}

module.exports = CardType
