'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addGlobalScope(function (builder) {
      builder
        .with('role')
        .with('status')
        .with('sendbird')
        .with('admin_type')
        .where('is_deleted', 0)
    })

    // this.addTrait('SoftDelete')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  // static get table () {
  //   return 'my_users'
  // }

  role() {
    return this.belongsTo('App/Models/Role')
  }
  // userRoles () {
  //   return this.manyThrough('App/Models/Role', 'userRoles')
  // }

  status() {
    return this.belongsTo('App/Models/Status')
  }

  admin_type() {
    return this.belongsTo('App/Models/AdminType')
  }

  cards() {
    return this.hasMany('App/Models/Card')
  }

  sendbird() {
    return this.hasOne('App/Models/SendBird')
  }

  addresses() {
    return this.hasMany('App/Models/Address')
  }

  schedules() {
    return this.hasMany('App/Models/Schedule')
  }

  device() {
    return this.hasOne('App/Models/UserDevice')
  }

  static get hidden() {
    return ['password', 'username', 'title', 'middle_name','display_picture_base64',
      'dob', 'gender_id', 'status_id', 'admin_type_id', 'stripe_customer_id', 'is_deleted', 'is_verified',
      'verified_at', 'deleted_at']
  }

  static get dates() {
    return super.dates.concat(['dob'])
  }



  static castDates(field, value) {
    if (field === 'dob') {
      return value.format('DD-MM-YYYY')
    }
  }

  // static formatDates (field, value) {
  //   if (field === 'dob') {
  //     return value.format('YYYY-MM-DD')
  //   }
  //   return super.formatDates(field, value)
  // }

  // static get Serializer () {
  //   return 'MyApp/CustomSerializer'
  // }
}

module.exports = User
