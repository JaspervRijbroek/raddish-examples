var ModelAbstract = require('raddish').ModelAbstract,
    util = require('util');

function ApplicationModel(config) {
    ModelAbstract.call(this, config);
}

util.inherits(ApplicationModel, ModelAbstract);

module.exports = ApplicationModel;