"use strict";

const Model = use("Model");

class Schedule extends Model {

  static get updatedAtColumn() {
    return "updated_at";
  }

  static get createdAtColumn() {
    return "created_at";
  }

  static get hidden() {
    return ["is_active", "created_at", "updated_at"];
  }
  repeat() {
    return this.hasOne('App/Models/Repeat')
  }

  quote() {
    return this.belongsTo('App/Models/Quote', 'quote_id', 'id')
  }

  status() {
    return this.belongsTo('App/Models/ScheduleStatus', 'status_id', 'id')
  }
  merchant() {
    return this.belongsTo('App/Models/Merchant')
  }
  customer() {
    return this.belongsTo('App/Models/User')
  }

  static get visible() {
    return ['id', 'quote_id','start_date', 'end_date', 'start_time','end_time','start_notes','stop_notes','initial_date', 'is_repeat']
  }
}

module.exports = Schedule;
