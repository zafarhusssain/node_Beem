'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * AddressTransformer class
 *
 * @class AddressTransformer
 * @constructor
 */
class AddressTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      address1: model.address1,
      address2: model.address2,
    }
  }
}

module.exports = AddressTransformer
