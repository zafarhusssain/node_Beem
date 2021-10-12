'use strict'

const Model = use('Model')

class InvoiceStatus extends Model {

  static get updatedAtColumn() {
    return 'updated_at'
  }

  static get createdAtColumn() {
    return 'created_at'
  }
  static get visible() {
    return ["id", "name"];
  }

}

module.exports = InvoiceStatus
