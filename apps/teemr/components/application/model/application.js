var ModelAbstract = require('raddish').ModelAbstract,
    util = require('util');

/**
 * An extended model from Abstract.
 * This is done because the controller will else search for the model, and the model will search for the database.
 *
 * @param {Object} config An object containing config data.
 * @constructor
 */
function ApplicationModel(config) {
    ModelAbstract.call(this, config);
}

util.inherits(ApplicationModel, ModelAbstract);

module.exports = ApplicationModel;