require('module-alias/register');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var chalk = require('chalk');
var config = require('./config');

require('dotenv').config();

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Allow CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/favicon.ico', (req, res) => {
	res.sendFile(`${__dirname}/static/favicon.ico`);
});

// Backend API routes
app.use(require('./src/backend/routes')());

// Catch any errors
app.use((err, req, res, next) => {
	if (err) {
		res.error(`There was an error parsing the request: ${err}`);
		return;
	}

	next();
});

// Frontend endpoints
app.use(express.static(__dirname + '/dist'));
app.use('/', express.static(__dirname + '/dist'));

// Catch all for frontend routes
app.all('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '/dist', '/index.html'));
});

const PORT = process.env.PORT || config.port;
app.listen(PORT);

console.log(chalk.green('Started on port ' + PORT));

//  Connect to MongoDB
const DATABASE = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : config.database;

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(res => {
		console.log(chalk.green('Connected to MongoDB: ' + DATABASE));
	}).catch(err => {
		console.log(chalk.red('Error connecting to MongoDB: ' + err));
	}
);
