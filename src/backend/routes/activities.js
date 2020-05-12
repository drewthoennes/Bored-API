const {Activity} = require('../models');
const {logActivity} = require('../keen');

module.exports = function(router) {
	router.get('/api/activity/', (req, res) => {
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

		// Assign filters to query database with
		const params = Object.assign(
			{'enabled': true},
			...['key', 'type', 'participants', 'price', 'accessibility']
				.filter(key => req.query[key])
				.map(key => ({[key]: req.query[key]})),
			...ranges // Ranges override concrete values (e.g., minprice overrides price)
		);

		logActivity(req, params);

		Activity.countDocuments(params).then(count => {
			if (!count || count === 0) throw new Error('No activities found with the specified parameters');

			return Activity.findOne(params).skip(Math.floor(Math.random() * count));
		}).then(activity => {
			if (!activity) throw new Error('No activity found');

			let formatted = Object.assign(
				{},
				...['activity', 'accessibility', 'type', 'participants', 'price', 'link', 'key']
					.map(key => ({[key]: activity[key] || ''}))
			);

			res.json(formatted);
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
