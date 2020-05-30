const {logQuery} = require('@b/keen');
const activitiesController = require('@b/controllers/activities');
const {unmaskActivity, maskActivity} = require('@b/routes/v1/masks');

module.exports = function(router) {
	router.get(['/api/activity/', '/api/v1/activity/'], (req, res) => {
		logQuery('activity', req.query);

		// Transform query data to be used on database
		req.query = unmaskActivity(req.query);

		// Aggregate the mins and maxes
		const ranges = ['price', 'participants', 'availability']
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

		// Assign filters to query database with
		const params = Object.assign(
			{},
			...['key', 'type', 'participants', 'price', 'availability']
				.filter(key => req.query[key])
				.map(key => ({[key]: req.query[key]})),
			...ranges // Ranges override concrete values (e.g., minprice overrides price)
		);

		activitiesController.findRandomActivity(params).then(activity => {
			res.json(maskActivity(activity));
		}).catch(err => {
			if (err.name === 'CastError') {

				res.error('Failed to query due to error in arguments');
			}
			else {
				res.error(err.message || 'There was an error querying for activity');
			}
		});
	});
};
