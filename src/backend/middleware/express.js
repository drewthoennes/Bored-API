module.exports = function(router) {
	// Add res.error method for error reporting
	router.use((req, res, next) => {
		res.error = function(err) {
			res.json({'error': err});
		};

		next();
	});
}
