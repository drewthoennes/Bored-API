module.exports = function(router) {
	router.get('/api/*', (req, res) => {
		res.error('Endpoint not found');
	});

	router.post('/api/*', (req, res) => {
		res.error('Endpoint not found');
	});

	router.put('/api/*', (req, res) => {
		res.error('Endpoint not found');
	});

	router.delete('/api/*', (req, res) => {
		res.error('Endpoint not found');
	});
};
