'use strict'

const Model = use('Model')

class Quote extends Model {

  static get updatedAtColumn() {
    return 'updated_at'
  }

  static get createdAtColumn() {
    return 'created_at'
  }
  services () {
    return this.hasMany('App/Models/QuoteService')
  }

  merchant () {
    return this.belongsTo('App/Models/Merchant')
  }

  customer () {
    return this.belongsTo('App/Models/User')
  }

  address(){
    return this.belongsTo('App/Models/Address', 'customer_address_id', 'id')
  }

  status () {
    return this.belongsTo('App/Models/QuoteStatus', 'status_id', 'id')
  }

  schedule() {
    return this.hasOne('App/Models/Schedule')
  }

  address () {
    return this.belongsTo('App/Models/Address', 'customer_address_id', 'id')
  }



  static get visible() {
    return ['id', 'quote_date','issue_date', 'customer_description', 'merchant_description']
  }

}

module.exports = Quote
