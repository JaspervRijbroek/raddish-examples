var Controller = require('raddish').Controller,
    util = require('util');

function ApplicationController(config) {
    Controller.call(this, config);
}

util.inherits(ApplicationController, Controller);

ApplicationController.prototype._actionGet = function(context) {
    return this.getView()
        .then(function(view) {
            context.result = view;
            context.status = 200;

            return context;
        });
};

module.exports = ApplicationController;