"use strict";

const Model = use("Model");

class Repeat extends Model {

  static get updatedAtColumn() {
    return "updated_at";
  }

  static get createdAtColumn() {
    return "created_at";
  }

  static get hidden() {
    return ["is_active", "created_at", "updated_at"];
  }

  static get visible() {
    return ['id', 'day_number', 'day_name', 'tentative_start_time', 'tentative_end_time']
  }
  type () {
    return this.belongsTo('App/Models/RepeatType')
  }

}

module.exports = Repeat;
