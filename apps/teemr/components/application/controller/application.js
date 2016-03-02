var Controller = require('raddish').Controller,
    util = require('util');


function ApplicationController(config) {
    Controller.call(this, config);
}

util.inherits(ApplicationController, Controller);

/**
 * An override of the GET action. Because the controller only needs to show data.
 *
 * @param {CommandContext} context The context for this call.
 * @returns {Promise} A promise containing the filled view.
 * @private
 */
ApplicationController.prototype._actionGet = function(context) {
    return this.getView()
        .then(function(view) {
            context.result = view;
            context.status = 200;

            return context;
        });
};

module.exports = ApplicationController;