// const {logActivity} = require('@b/keen');
const websitesController = require('@b/controllers/websites');

module.exports = function(router) {
	router.get('/api/v2/websites(/:key)?', (req, res) => {
		// logActivity(req, params);

		if (req.params.key) {
			return websitesController.findWebsiteByKey(req.params.key).then(website => {
				res.json({'website': website});
			}).catch(err => {
				res.json({'error': err});
			});
		}

		websitesController.findRandomWebsite().then(website => {
			res.json({'website': website});
		}).catch(err => {
			if (err.name === 'CastError') {
				res.json({'error': 'Failed to query due to error in arguments'});
			}
			else {
				res.json({'error': err.message || 'There was an error querying for website'});
			}
		});
	});
};
