/**
 * Because of the html layer we need quite some overrides and extensions.
 * "com_default" will take care of that, this will incorporate all the needed data for the html layer.
 */

var Dispatcher = require('raddish').DispatcherAbstract,
    util = require('util');

function DispatcherDefault(config) {
    Dispatcher.call(this, config);
}

util.inherits(DispatcherDefault, Dispatcher);

/**
 * An override for the dispatcher.
 * The override is created because we want to !!return!! the rendered view.
 * instead of returning all the data to the reponse directly. com_application will do this!
 *
 * @param {Request} request The nodejs request object.
 * @param {Response} response The nodejs response object.
 * @returns {Promise} A promise containing the rendered HTML.
 */
DispatcherDefault.prototype.dispatch = function(request, response) {
    return Dispatcher.prototype.dispatch.call(this, request, response)
        .then(function (data) {
            return data.result.display();
        });
};

module.exports = DispatcherDefault;