const express = require('express');

module.exports = function() {
	let router = express.Router();

	router.get('/api', (req, res) => {
		res.json({'message': 'Bored API'});
	});

	require('./v1')(router);
	require('./v2')(router);
	require('./error')(router);

	return router;
};
