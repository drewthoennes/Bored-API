const {
	ActivitySuggestion,
	FactSuggestion,
	RiddleSuggestion,
	WebsiteSuggestion,
} = require('@b/models');
const utilsController = require('@b/controllers/utils');
const joi = require('@hapi/joi');
const middleware = require('@b/middleware');

const defaultTypes = ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'];

const suggestionSchema = joi.object().keys({
	activity: joi.object().keys({
		activity: joi.string().required(),
		type: joi.string().valid(...defaultTypes).required(),
		participants: joi.number().min(1).required()
	}),
	fact: joi.object().keys({
		fact: joi.string().required(),
		source: joi.string().uri().required()
	}),
	riddle: joi.object().keys({
		question: joi.string().required(),
		answer: joi.string().required(),
		source: joi.string().uri().required()
	}),
	website: joi.object().keys({
		url: joi.string().uri().required(),
		description: joi.string().required()
	})
}).xor('activity', 'fact', 'riddle', 'website').required();

module.exports = function(router) {
	router.post('/api/v2/suggestions', middleware.validate(suggestionSchema), (req, res) => {
		let type;
		let model;

		switch (type = Object.keys(req.body)[0]) {
			case 'activity':
				model = ActivitySuggestion;
				break;
			case 'fact':
				model = FactSuggestion;
				break;
			case 'riddle':
				model = RiddleSuggestion;
				break;
			case 'website':
				model = WebsiteSuggestion;
				break;
		}

		let suggestion = {
			profile: {
				agent: req.header('user-agent')
			},
			type,
			...req.body
		};

		model.create(suggestion, err => {
			if (err) {
				res.error(err);
				return;
			}

			res.send({'message': 'Successfully created suggestion'});
		});
	});
};
