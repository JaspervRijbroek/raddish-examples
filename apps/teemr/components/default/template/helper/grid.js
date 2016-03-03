function GridHelper() {

}

GridHelper.prototype.form = function(method, action, options) {
    return '<form method="' + method + '" action="' + action + '">' + options.fn() + '</form>';
};

module.exports = GridHelper;