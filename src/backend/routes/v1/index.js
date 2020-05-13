const express = require('express');

module.exports = function(router) {

	require('./activities')(router);
	require('./suggestions')(router);

	return router;
};
