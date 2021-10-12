'use strict'

const Model = use('Model')

class Invoice extends Model {

  static get updatedAtColumn() {
    return 'updated_at'
  }

  static get createdAtColumn() {
    return 'created_at'
  }
  quote () {
    return this.belongsTo('App/Models/Quote')
  }
  merchant () {
    return this.belongsTo('App/Models/Merchant')
  }

  customer () {
    return this.belongsTo('App/Models/User')
  }

  status () {
    return this.belongsTo('App/Models/InvoiceStatus', 'status_id', 'id')
  }
  static get visible() {
    return ['id', 'amount', 'paid_date','generate_date']
  }
}

module.exports = Invoice
