const express = require('express');
const {express: expressMiddlware} = require('@b/middleware');

module.exports = function() {
	let router = express.Router();

	expressMiddlware(router);

	router.get('/api', (req, res) => {
		res.json({'message': 'Bored API'});
	});

	require('./v1')(router);
	require('./v2')(router);
	require('./error')(router);

	return router;
};
