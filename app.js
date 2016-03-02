var raddish = require('raddish');

// This method accepts a path to a file.
raddish.setConfig('./config.json');

// To register your application you need to set it into raddish.
raddish.setApplication('teemr', './apps/teemr/app.js');

// Check for updates.
raddish.checkUpdate();

// Start the http(s) server.
raddish.start();