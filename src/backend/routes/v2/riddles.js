// const {logActivity} = require('@b/keen');
const riddlesController = require('@b/controllers/riddles');
const {maskRiddle} = require('@b/routes/v2/masks');

module.exports = function(router) {
	router.get('/api/v2/riddles(/:key)?', (req, res) => {
		// logActivity(req, params);

		if (req.params.key) {
			return riddlesController.findRiddleByKey(req.params.key).then(riddle => {
				res.json({'riddle': maskRiddle(riddle)});
			}).catch(err => {
				res.error(err);
			});
		}

		riddlesController.findRandomRiddle().then(riddle => {
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
