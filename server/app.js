'use strict';

var SwaggerExpress = require('swagger-express-mw');

// var customerService = require("./api/service/customer_service")
var express = require('express'),
    app = express(),
    path = require('path');
var utils = require('./api/lib/util');
var multer = require('multer')

var upload = multer({
    dest: 'uploads/'
})

module.exports = app; // for testing
//custom files
require('./config/db');
// var cron = require('node-cron');

var config = {
    appRoot: __dirname // required config
};
console.log("config", config)

app.use('/public', express.static(path.join(__dirname, './public')));
SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }
    app.use(function (req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization');

        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });
    app.use('/api/*', function (req, res, next) {
        var is_free_auth = req.baseUrl.split('/f/').length > 1 ? ((req.headers["authorization"] || req.query["api_key"]) ? false : true) : false;
        if (!is_free_auth) {
            utils.ensureAuthorized(req, res, next);
        } else {
            next();
        }
    });
    // cron.schedule('* * * * *', () => {
    //   console.log('running a task every minute');
    // });
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 5151;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
        console.log("test")
    }
    app.post('/sigweb', upload.single('sign'), function (req, res, next) {
        console.log("req body content>>>>>>>>>>>", req.body)
        let mongoose = require('mongoose'),
            SIGN = mongoose.model('signatures');
        var data = {
            sign: req.body.file,
            consignee_name: req.body.name
        }

        var sign = new SIGN(data);
        sign.save(function (err, data) {
            if (err) {
                console.log("errrr", err)
                res.send(err)
            } else {
                console.log("data", data)
                var url = "http://localhost:4200/bac/shipping-managment/generate/releases";
                console.log("url", url)
                res.send(url);
            }
        });

    })
});