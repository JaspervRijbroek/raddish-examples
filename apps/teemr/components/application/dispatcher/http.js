var Dispatcher = require('raddish').DispatcherAbstract,
    util = require('util');

function ApplicationDispatcher(config) {
    Dispatcher.call(this, config);
}

util.inherits(ApplicationDispatcher, Dispatcher);

ApplicationDispatcher.prototype.dispatch = function(request, response) {
    // This will return the data instead of dispatching it.
    // So we will run the component as expected.
    // This should still be somewhere in the request.

    // This is an override for the view. Because we always need to render the application view.
    var self = this;
    request.url.query.view = 'application';

    this._runComponent(request, response)
        .then(function(data) {
            return Dispatcher.prototype.dispatch.call(self, request, response)
                .then(function(context) {
                    context.result.input = data;
                    return context;
                });
        })
        .then(function (data) {
            var value = data.result.display();

            if(Object.keys(data.result.headers).length > 0) {
                for(var index in data.result.headers) {
                    response.setHeader(index, data.result.headers[index]);
                }
            }

            response.statusCode = data.status;
            return value;
        })
        .then(function (data) {
            return self.GZip(request, response, data);
        })
        .then(function (data) {
            data.pipe(response);
        })
        .catch(function (error) {
            if((error instanceof RaddishError) === false) {
                error = new RaddishError(500, error.message);
            }

            self.handleException(response, error);
        });
};

ApplicationDispatcher.prototype._runComponent = function(request, response) {
    return Promise.resolve('hello world');
};

module.exports = ApplicationDispatcher;