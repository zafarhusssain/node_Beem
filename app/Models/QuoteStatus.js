"use strict";

const Model = use("Model");

class QuoteStatus extends Model {

  static get updatedAtColumn() {
    return "updated_at";
  }

  static get createdAtColumn() {
    return "created_at";
  }

  static get hidden() {
    return ["is_active", "created_at", "updated_at"];
  }
  // status () {
  //   return this.belongsTo('App/Models/Quote')
  // }

  static get visible() {
    return ["id", "name"];
  }
}

module.exports = QuoteStatus;
