var express = require('express'),
	morgan = require('morgan'),
	path = require('path'),
	serveStatic = require('serve-static'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	mongoose = require('mongoose'),
	fs = require('fs');
	// enforce = require('express-sslify');

require('dotenv').config();

app = express();

app.use(favicon(__dirname + '/favicon/favicon.ico'));

if (process.env.NODE_ENV !== 'dev') {
	// console.log('Enforcing HTTPS');
	// app.use(enforce.HTTPS());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
