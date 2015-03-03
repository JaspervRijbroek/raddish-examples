var Model = require('raddish').Model,
    util = require('util');

function TodoModel(config) {
    Model.call(this, config);
    
    this.states
        .insert('enabled', 'int');
}

util.inherits(TodoModel, Model);

TodoModel.prototype.buildQueryWhere = function(self, query) {
    var enabled = self.states.get('enabled').value;
    
    if(enabled) {
        query.where('tbl.enabled', '=', enabled);
    }
    
    return self.prototype.buildQueryWhere.call(this, self, query);
};

module.exports = TodoModel;