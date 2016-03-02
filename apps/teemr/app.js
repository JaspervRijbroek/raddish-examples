var Application = require('raddish').Application,
    util = require('util');

function TeemrApplication() {
    Application.call(this);

    this.config = {
        component: __dirname + '/components',
        config: __dirname + '/config'
    };
}

util.inherits(TeemrApplication, Application);

TeemrApplication.prototype.runComponent = function(component, request, response) {
    /**
     * We will do an override here, because the application now always needs to run com_application first.
     * After this we will redirect it to the other component.
     * Although there will be some bears on the road.
     */

    try {
        var Component = require(this.config.component + '/application/application');
        new Component(request, response);
    } catch(error) {
        if(error instanceof RaddishError) {
            throw error;
        }

        throw new RaddishError(404, 'Component "application" not found!');
    }
};

module.exports = TeemrApplication;