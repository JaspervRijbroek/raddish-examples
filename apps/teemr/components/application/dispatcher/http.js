var Dispatcher = require('raddish').HttpDispatcher,
    util = require('util');

function ApplicationDispatcher(config) {

}

util.inherits(ApplicationDispatcher, Dispatcher);

ApplicationDispatcher.prototype.dispatch = function(request, response) {
    // This will return the data instead of dispatching it.
    // So we will run the component as expected.
    // This should still be somewhere in the request.

};

ApplicationDispatcher.prototype._runComponent = function(request, response) {

};

module.exports = ApplicationDispatcher;