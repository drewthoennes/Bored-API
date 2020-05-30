const {logQuery} = require('@b/keen');
const factsController = require('@b/controllers/facts');
const {maskFact} = require('@b/routes/v2/masks');

module.exports = function(router) {
	router.get('/api/v2/facts(/:key)?', (req, res) => {
		logQuery('fact', req.query);

		if (req.params.key) {
			return factsController.findFactByKey(req.params.key).then(fact => {
				res.json({'fact': maskFact(fact)});
			}).catch(err => {
				res.error(err);
			});
		}

		factsController.findRandomFact().then(fact => {
			res.json({'fact': maskFact(fact)});
		}).catch(err => {
			if (err.name === 'CastError') {
				res.error('Failed to query due to error in arguments');
			}
			else {
				res.error(err.message || 'There was an error querying for fact');
			}
		});
	});
};
