const express = require('express');

module.exports = function(router) {

	require('./activities')(router);
	// require('./facts')(router);
	// require('./riddles')(router);
	// require('./websites')(router);

	return router;
};
