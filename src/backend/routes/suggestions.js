const {Suggestion} = require('../models');
const methods = require('../utils/methods.js');

module.exports = function(router) {
	router.post('/api/suggestion', (req, res) => {
		let defaultTypes = ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'];

		if (!req.body.activity || !req.body.type || !req.body.participants) {
			res.send({'error': 'Missing fields'});
			return;
		}
		if (typeof req.body.activity !== 'string') {
			res.send({'error': 'Activity must be a string'});
			return;
		}
		if (!defaultTypes.includes(req.body.type)) {
			res.send({'error': 'Type must be a valid type'});
			return;
		}
		if (!Number.isInteger(req.body.participants)) {
			res.send({'error': 'Participants must be an integer'});
			return;
		}
		if (req.body.participants < 1) {
			res.send({'error': 'There must be at least one participant'});
			return;
		}

		let params = {
			'enabled': true,
			'activity': methods.stringSanitize(req.body.activity),
			'type': req.body.type,
			'participants': parseInt(req.body.participants)
		};

		Suggestion.create(params, err => {
			if (err) {
				res.send({'error': err});
				return;
			}

			res.send({'message': 'Successfully created suggestion'});
		});
	});
};
