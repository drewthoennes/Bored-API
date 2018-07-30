var express = require('express'),
	morgan = require('morgan'),
	path = require('path'),
	serveStatic = require('serve-static'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	mongoose = require('mongoose'),
	fs = require('fs');

app = express();

//	app.use(favicon(__dirname + '/src/assets/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Backend API routes
require('./server/routes/api.js')(app);
// Catch all for API routes that don't exist
require('./server/routes/error.js')(app);

// Frontend endpoints
app.use(express.static(__dirname + "/dist"));
app.use('/', express.static(__dirname + "/dist"));
// Catch all for frontend
app.all('/*', function(req, res) {
		res.sendFile(path.join(__dirname, '/dist', '/index.html'));
});

var port = process.env.PORT || 8080;
app.listen(port);

console.log("Started on port " + port);

//  Connection to MongoDB
console.log('Starting API');

// var config = require('./config'),
// 	database = process.env.MONGODB_URI || config.database;
var database = process.env.MONGODB_URI || "mongodb://localhost:27017/boredapi";

mongoose.Promise = global.Promise;
mongoose.connect(database, function(err, res) {
	if(err) {
		console.log('Error connecting to MongoDB: ' + err);
	}
	else {
		console.log('Connected to MongoDB: ' + database);
	}
});
