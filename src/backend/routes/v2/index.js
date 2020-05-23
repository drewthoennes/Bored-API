module.exports = function(router) {

	require('./activities')(router);
	require('./facts')(router);
	require('./riddles')(router);
	require('./websites')(router);
	require('./suggestions')(router);

	return router;
};
