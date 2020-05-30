const {logQuery} = require('@b/keen');
const riddlesController = require('@b/controllers/riddles');
const {maskRiddle} = require('@b/routes/v2/masks');

module.exports = function(router) {
	router.get('/api/v2/riddles(/:key)?', (req, res) => {
		logQuery('riddle', req.query);

		// Assign filters to query database
		const params = Object.assign(
			{},
			...['difficulty']
				.filter(key => req.query[key])
				.map(key => ({[key]: req.query[key]})),
		);

		if (req.params.key) {
			return riddlesController.findRiddle({'key': req.params.key, ...params}).then(riddle => {
				res.json({'riddle': maskRiddle(riddle)});
			}).catch(err => {
				res.error(err);
			});
		}

		riddlesController.findRandomRiddle(params).then(riddle => {
			res.json({'riddle': maskRiddle(riddle)});
		}).catch(err => {
			if (err.name === 'CastError') {
				res.error('Failed to query due to error in arguments');
			}
			else {
				res.error(err.message || 'There was an error querying for riddle');
			}
		});
	});
};
