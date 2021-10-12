'use strict'

const Model = use('Model')

class Merchant extends Model {

      static get updatedAtColumn() {
        return 'updated_at'
      }

      static get createdAtColumn() {
        return 'created_at'
      }
      addresses () {
        return this.hasMany('App/Models/Address')
      }

      services () {
        return this.hasMany('App/Models/MerchantService')
      }

      // static get hidden () {
      //   return ['is_active', 'created_at', 'updated_at']
      // }
      static get visible() {
        return ['id', 'address_id', 'business_name', 'owner_name', 'dob', 'email', 'phone_number', 'description', 'hero_image', 'hero_image_url_from_base64', 'logo', 'logo_url_from_base64', 'stripe_merchant_id']
      }
}

module.exports = Merchant
