'use strict';

/* DB */
var mongoose = require('mongoose');
require('../api/models/staffProfile');
require('../api/models/StaffType');
require('../api/models/SocialLogin');
require('../api/models/Staff');
var Config = require('./config.js').get(process.env.NODE_ENV || 'staging');
// var Config = require('./config.js').get(process.env.NODE_ENV || 'local');

// mongoose.connect(Config.DATABASE.host + Config.DATABASE.database_name, {
//     useNewUrlParser: true
// })
var options = {
    user: Config.DATABASE.username,
    pass: Config.DATABASE.password,
};
mongoose.connect(Config.DATABASE.host + Config.DATABASE.dbname, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection failed"));
db.once('open', function () {
    console.log("Database conencted successfully and project Started!", Config.DATABASE.host + Config.DATABASE.dbname);
});
mongoose.set('debug', false);
/* end DB */