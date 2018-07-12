//server.js

// Modules ===============================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require ('fs');
var https = require ('https');

// Configuration ==========================================
require('dotenv').config();

// Set port ===============================================
var port = process.env.PORT || 80;

// Express middleware =====================================
// Parse application/json
app.use(bodyParser.json());
// Parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// Override the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// Set static files location to /client -- /client/img with be /img for users
app.use(express.static(__dirname + '/client'));

// Routes =================================================
require('./app/routes')(app);

// start app ==============================================
app.listen(port);

console.log('Server listening on port ' + port);

exports = module.exports = app;