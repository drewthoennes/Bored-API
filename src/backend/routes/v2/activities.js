const {logActivity} = require('@b/keen');
const activitiesController = require('@b/controllers/activities');
const {unmaskActivity, maskActivity} = require('@b/routes/v2/masks');

module.exports = function(router) {
	router.get('/api/v2/activities(/:key)?', (req, res) => {
		// Transform query data to be used on database
		req.query = unmaskActivity(req.query);

		if (req.params.key) {
			return activitiesController.findActivity({'key': req.params.key}).then(activity => {
				res.json({'activity': maskActivity(activity)});
			}).catch(err => {
				res.json({'error': err});
			});
		}

		// Aggregate the mins and maxes
		const ranges = ['price', 'participants', 'accessibility']
			.filter(range => req.query[`min${range}`] || req.query[`max${range}`]) // Filter out ranges that aren't specified
			.map(range => {
				return {
					[range]: Object.assign(
						{},
						...[`max${range}`, `min${range}`] // Add min and max if defined
							.filter(key => req.query[key])
							.map(key => ({[key.substr(0, 3) === 'max' ? '$lte': '$gte']: req.query[key]}))
					)
				};
			}
		);

		// Assign filters to query database
		const params = Object.assign(
			{'enabled': true},
			...['type', 'participants', 'price', 'accessibility']
				.filter(key => req.query[key])
				.map(key => ({[key]: req.query[key]})),
			...ranges // Ranges override concrete values (e.g., minprice overrides price)
		);

		logActivity(req, params);

		activitiesController.findRandomActivity(params).then(activity => {
			res.json({'activity': maskActivity(activity)});
		}).catch(err => {
			if (err.name === 'CastError') {
				res.json({'error': 'Failed to query due to error in arguments'});
			}
			else {
				res.json({'error': err.message || 'There was an error querying for activity'});
			}
		});
	});
};
