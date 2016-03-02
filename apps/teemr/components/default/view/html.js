var View = require('raddish').ViewAbstract,
    util = require('util'),
    fs = require('fs'),
    Application = require('raddish').Application,
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

util.inherits(ViewHtml, View);

/**
 * Override to provide the mimetype of the content.
 *
 * @param {Object} config The config of this object.
 * @returns {Promise} A promise containing the initialized object.
 */
ViewHtml.prototype.initialize = function (config) {
    config.mimetype = 'text/html';

    return View.prototype.initialize.call(this, config);
};

/**
 * Override of the display method.
 * This method will get the file path and will parse thie file.
 * Although a lot more checks must be in here. This still is quite verbose.
 *
 * @returns {String} The rendered HTML.
 */
ViewHtml.prototype.display = function() {
    var identifier = this.data ? this.data.getIdentifier().clone() : this.model.getIdentifier().clone(),
        application = Application.getApplication(identifier.getApplication()),
        path = application.config.component + '/' + identifier.getPackage() + '/view/' + identifier.getName() + '/template.hbs',
        template = handlebars.compile(fs.readFileSync(path).toString());

    this.data = this.data || {};
    this.data.component = this.input;

    return template(this.data);
};

module.exports = ViewHtml;