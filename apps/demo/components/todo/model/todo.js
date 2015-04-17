var Model = require('raddish').Model,
    util = require('util');

function TodoModel(config) {
    Model.call(this, config);
    
    this.states
        .insert('enabled', 'int');
}

util.inherits(TodoModel, Model);

TodoModel.prototype.buildQueryWhere = function(query) {
    var enabled = this.states.get('enabled').value;
    
    if(enabled) {
        query.where('tbl.enabled', '=', enabled);
    }
    
    return Model.prototype.buildQueryWhere.call(this, query);
};

module.exports = TodoModel;