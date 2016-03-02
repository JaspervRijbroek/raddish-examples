var Application = require('raddish').Application,
    util = require('util');

function TeemrApplication(config) {
    config.component = __dirname + '/components';
    config.config = __dirname + '/config';

    Application.call(this, config);
}

util.inherits(TeemrApplication, Application);

TeemrApplication.prototype.runComponent = function(component, request, response) {
    /**
     * We will do an override here, because the application now always needs to run com_application first.
     * After this we will redirect it to the other component.
     * ALthough there will be some bears on the road.
     */

    try {
        var Component = require(this.config.component + '/application/application');
        new Component(req, res);
    } catch(error) {
        if(error instanceof RaddishError) {
            throw error;
        }

        throw new RaddishError(404, 'Component "application" not found!');
    }
};

module.exports = TeemrApplication;