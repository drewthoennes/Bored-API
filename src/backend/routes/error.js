module.exports = function(router) {
	router.get('/api/*', (req, res) => {
		res.json({'error': 'Endpoint not found'});
	});
}
