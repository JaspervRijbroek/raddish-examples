var View = require('raddish').ViewAbstract,
    util = require('util'),
    fs = require('fs'),
    Application = require('raddish').Application,
    Handlebars = require('handlebars');

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
    this._registerHelpers();

    var identifier = this.data ? this.data.getIdentifier().clone() : this.model.getIdentifier().clone(),
        application = Application.getApplication(identifier.getApplication()),
        path = application.config.component + '/' + identifier.getPackage() + '/view/' + identifier.getName() + '/template.hbs',
        template = Handlebars.compile(fs.readFileSync(path).toString());

    this.data = this.data || {};
    this.data.component = this.input;

    return template(this.data);
};

ViewHtml.prototype._registerHelpers = function() {
    var self = this;

    Handlebars.registerHelper('helper', function() {
        // we will use the arguments here.
        var params = Array.prototype.slice.call(arguments),
            parts = params.shift().split('.');

        var identifier = self.getIdentifier().clone();
        identifier.setPath(['template', 'helper']);
        identifier.setName(parts[0]);

        var Helper = ObjectLoader.require(identifier);
        if(Helper) {
            var helper = new Helper();
            return helper[parts[1]].apply(helper, params);
        } else {
            return '';
        }
    });

    Handlebars.registerHelper('modules', function(position) {
        // Use this to render the modules.
    });

    Handlebars.registerHelper('count_modules', function(position) {
        // Count the modules in a certain position.
    });

    Handlebars.registerHelper('media', function(tag, options) {
        // This is too easy to be true ofcourse.
        var path = '/assets/' + options.fn();
        var element = '';

        switch(tag) {
            case 'link':
                element = '<link rel="stylesheet" href="' + path + '"/>';
                break;
            case 'script':
                element = '<script type="text/javascript" src="' + path + '"></script>';
                break;
        }

        return element;
    });
};

module.exports = ViewHtml;