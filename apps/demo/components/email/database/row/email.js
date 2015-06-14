var Row = require('raddish').Row,
    util = require('util');

function EmailRow(config) {
    Row.call(this, config);
}

util.inherits(EmailRow, Row);

EmailRow.prototype.save = function() {
    // Everything is already set in the this.data.
    // All I have to do is parse things over here.

    this.data.from = this.data.from.address;
    this.data.to = this.data.to.map(function(to) {
        return to.address;
    });
    this.data.to = this.data.to.join(', ');

    return Row.prototype.save.call(this);
};

module.exports = EmailRow;