/**
 * This is an example plugin to receive emails and put them in the correct place using rowsets and rows.
 * This will check if the email is already stored or not, if not it will be saved afterwards.
 *
 * The code will be split up in a few parts because of the module we are using.
 */
var Imap = require('imap'),
    Mailparser = require('mailparser');

function MailPlugin() {
    this.connection = false;
}

MailPlugin.prototype.onBeforeRegister = function(alias, path) {
    this._getConnection();
    return this._parseMail();
};

MailPlugin.prototype._parseMail = function() {
    return this._openMailbox('inbox')
        .then(this._findUnseen)
        .then(this._fetchMessages)
        .then(function(messages) {
            // We have just received a complete list of messages.
            // After this we will save all the records to the database.

            return ObjectManager.get('com://demo/email.database.rowset.email')
                .then(function(rowset) {
                    return rowset.setData(messages);
                });
        })
        .then(function(rowset) {
            return rowset.save();
        });
};

MailPlugin.prototype._getConnection = function() {
    var imapConfig = Raddish.getConfig('imap'); // Get the config from the config.json file this is equal to the module config.
    this.connection = new Imap(mailConfig);
};

MailPlugin.prototype._openMailbox = function(mailbox) {
    var self = this;
    mailbox = mailbox.toString().toUpperCase();

    return new Promise(function(resolve, reject) {
        self.connection.openBox(mailbox, function(err, box) {
            if(err) {
                return reject(err);
            }

            return resolve(box);
        });
    });
};

MailPlugin.prototype._findUnseen = function(box) {
    var self = this;

    return new Promise(function(resolve, reject) {
        self.connection.search(['UNSEEN'], function(err, messagesArray) {
            if(err) {
                return reject(err);
            }

            return resolve(messagesArray);
        });
    });
};

MailPlugin.prototype._fetchMessages = function(messagesArray) {
    var self = this,
        msgs = [];

    return new Promise(function(resolve, reject) {
        var messages = self.connection.fetch(messagesArray, {bodies: ''});
        messages.on('message', function(message) {
            var mailParser = new Mailparser.MailParser();

            message.on('body', function(stream) {
                stream.pipe(mailParser);
            });

            mailParser.on('end', function(mail) {
                msgs.push(mail);
            });
        });

        messages.on('error', function(err) {
            return reject(err);
        });

        messages.on('end', function() {
            return resolve(msgs);
        });
    });
};

module.exports = MailPlugin;