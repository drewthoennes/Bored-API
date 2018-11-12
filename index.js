var express = require('express');
var morgan = require('morgan');
var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var fs = require('fs');
var sitemap = require('express-sitemap')();
var chalk = require('chalk');
var config = require('./config');

require('dotenv').config();

app = express();

app.use(favicon(__dirname + '/favicon/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Backend API routes
app.use(require('./src/server/routes/api.js')());

// Frontend endpoints
app.use(express.static(__dirname + "/dist"));
app.use('/', express.static(__dirname + "/dist"));
// Catch all for frontend routes
app.all('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '/dist', '/index.html'));
});

const PORT = process.env.PORT || config.dev.port;
app.listen(PORT);

console.log(chalk.green("Started on port " + PORT));

//  Connection to MongoDB
const DATABASE = process.env.MONGODB_URI || config.dev.database;

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE, { useNewUrlParser: true })
	.then(res => {
		console.log(chalk.green('Connected to MongoDB: ' + DATABASE));
	}).catch(err => {
		console.log(chalk.red('Error connecting to MongoDB: ' + err));
	}
);
