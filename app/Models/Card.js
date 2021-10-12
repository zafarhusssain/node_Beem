'use strict'

const Model = use('Model')

class Card extends Model {
  
      static get updatedAtColumn() {
        return 'updated_at'
      }
    
      static get createdAtColumn() {
        return 'created_at'
      }
      static get visible() {
        return ['id', 'card_name', 'card_token', 'customer', 'last4', 'exp_month', 'exp_year']
      }
}

module.exports = Card
