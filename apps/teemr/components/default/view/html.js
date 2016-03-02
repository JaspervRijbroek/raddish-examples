var View = require('raddish').ViewAbstract,
    util = require('util'),
    handlebars = require('handlebars');

/**
 * This file will be responsibel for getting the hbs file and parsing it.
 * So another big override for the view.
 */

function ViewHtml(config) {
    // The input will be received from the dispatcher.
    View.call(this, config);

    this.input = '';
}

ViewHtml.prototype.initialize = function (config) {
    config.mimetype = 'text/html';

    return View.prototype.initialize.call(this, config);
};

util.inherits(ViewHtml, View);

ViewHtml.prototype.display = function() {
    // Here we will search for the view ".hbs" file and render it with the data received.
    // We can get the file based on the identifier.
    // This should work ;) Else we can always use the "this.data" and its identifier.

    // Get the file.
};

module.exports = ViewHtml;