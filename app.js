var raddish = require('raddish');

// This method accepts a path to a file.
raddish.setConfig('./config.json');

// To register your application you need to set it into raddish.
raddish.setApplication('demo', './apps/demo/app.js');

// Check for updates.
raddish.checkUpdate();

// Start the http(s) server.
raddish.start();