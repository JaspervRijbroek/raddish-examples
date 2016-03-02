var Dispatcher = require('raddish').DispatcherAbstract,
    util = require('util');

function ApplicationDispatcher(config) {
    Dispatcher.call(this, config);
}

util.inherits(ApplicationDispatcher, Dispatcher);

/**
 * Override for the dispatch method.
 * In this override we will tell the system to load a dispatcher of the requested component (if given!).
 * else we will render the normal template. If the component is found and rendered this content
 * might be rendered into the template.
 *
 * @param {Request} request The nodejs request object.
 * @param {Response} response The nodejs response object.
 */
ApplicationDispatcher.prototype.dispatch = function(request, response) {
    var self = this;

    this._runComponent(request, response)
        .then(function(data) {
            request.url.query.view = 'application';

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

/**
 * An override for the parseRequest method.
 * This method is added because the application component has nothing to do with the data in the request,
 * also if I try to parse a request twice it will give issues. (no idea from where??)
 *
 * @param {Request }req The nodejs request object.
 */
ApplicationDispatcher.prototype.parseRequest = function (req) {
    return Promise.resolve(true);
};

/**
 * Override for the controller.
 * The controller requested for the application component always needs to be application.
 * Unless an error is dispatched.
 *
 * @param {Request} req The nodejs request object.
 * @returns {Controller} A promise containing the requested controller.
 */
ApplicationDispatcher.prototype.getController = function (req) {
    var identifier = this.getIdentifier().clone();

    return this.getObject(identifier.setPath(['controller']).setName('application'))
        .then(function(controller) {
            controller.request      = req.url.query;
            controller.request.view = req.url.query.view || Inflector.pluralize(controller.getIdentifier().getName());
            controller.format       = (req.url.query.format || Raddish.getConfig('format'));

            return controller;
        });
};

/**
 * A custom method which will allow us to get the HTML output of a component.
 *
 * @param {Request} request The nodejs request object.
 * @param {Response} response The nodejs response object.
 * @returns {Promise} A promise containing the HTML output (if any).
 * @private
 */
ApplicationDispatcher.prototype._runComponent = function(request, response) {
    // We have the request and in here is the component.
    if(ObjectLoader.require('com://teemr/' + request.url.query.component + '.dispatcher.http')) {
        return this.getObject('com://teemr/' + request.url.query.component + '.dispatcher.http')
            .then(function (dispatcher) {
                return dispatcher.dispatch(request, response);
            })
    } else {
        return Promise.resolve('');
    }
};

module.exports = ApplicationDispatcher;