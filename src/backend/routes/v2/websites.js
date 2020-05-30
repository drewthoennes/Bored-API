const {logQuery} = require('@b/keen');
const websitesController = require('@b/controllers/websites');
const {maskWebsite} = require('@b/routes/v2/masks');

module.exports = function(router) {
	router.get('/api/v2/websites(/:key)?', (req, res) => {
		logQuery('website', req.query);

		if (req.params.key) {
			return websitesController.findWebsiteByKey(req.params.key).then(website => {
				res.json({'website': maskWebsite(website)});
			}).catch(err => {
				res.error(err);
			});
		}

		websitesController.findRandomWebsite().then(website => {
			res.json({'website': maskWebsite(website)});
		}).catch(err => {
			if (err.name === 'CastError') {
				res.error('Failed to query due to error in arguments');
			}
			else {
				res.error(err.message || 'There was an error querying for website');
			}
		});
	});
};
