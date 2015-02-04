var Application = require('raddish').Application;
var util        = require('util');

function DemoApplication() {
    Application.call(this);

    // We have to call the setConfig methods to let the application know where to find the components and config files.
    this.setConfig({
        component: __dirname + '/components',
        config: __dirname + '/config'
    });
}

// The application class holds the base methods to run.
// So we have to extend from this object.
util.inherits(DemoApplication, Application);

module.exports = DemoApplication;