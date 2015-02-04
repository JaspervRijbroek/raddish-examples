var Application = require('raddish').Application;
var util        = require('util');

function DemoApplication() {
    Application.call(this);

    this.setConfig({
        component: __dirname + '/components',
        config: __dirname + '/config'
    });
}

util.inherits(DemoApplication, Application);

module.exports = DemoApplication;