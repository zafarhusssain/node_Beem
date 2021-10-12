'use strict'

const Model = use('Model')

class Address extends Model {

  static boot() {
    super.boot()

    this.addGlobalScope(function (builder) {
      builder.where('is_active', 1)
    })
  }

  static get updatedAtColumn() {
    return 'updated_at'
  }

  static get createdAtColumn() {
    return 'created_at'
  }

  type() {
    return this.hasOne('App/Models/AddressType')
  }


  static get visible() {
    return ['id', 'address_type_id', 'address_name', 'address1', 'address2', 'city', 'state', 'zip_code', 'security_code', 'longitude', 'latitude']
  }
  
}

module.exports = Address
