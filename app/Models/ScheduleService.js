'use strict'

const Model = use('Model')

class ScheduleService extends Model {

  static get updatedAtColumn() {
    return 'updated_at'
  }

  static get createdAtColumn() {
    return 'created_at'
  }
  status () {
    return this.hasOne('App/Models/ServiceStatus', 'status_id', 'id')
  }

  service () {
    return this.hasOne('App/Models/MerchantService', 'service_id', 'id')
  }
}

module.exports = ScheduleService
