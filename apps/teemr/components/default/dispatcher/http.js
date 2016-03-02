/**
 * Because of the html layer we need quite some overrides and extensions.
 * "com_default" will take care of that, this will incorporate all the needed data for the html layer.
 */

var Dispatcher = require('raddish').HttpDispatcher,
    util = require('util');

function DispatcherDefault(config) {
    Dispatcher.call(this, config);
}

util.inherits(DispatcherDefault, Dispatcher);

DispatcherDefault.prototype.dispatch = function(request, response) {
    // Usually the dispatcher will send everything back, but in this case the dispatcher of the
    // application component will do that for us, so all we have to return here is the rendered view.
};

module.exports = DispatcherDefault;