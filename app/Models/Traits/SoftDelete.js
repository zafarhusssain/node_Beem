'use strict'

class SoftDelete {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.newAdminUser = function () {
      let m = new Model()
      m.isAdmin = true
      return m
    }
  }
}

module.exports = SoftDelete
