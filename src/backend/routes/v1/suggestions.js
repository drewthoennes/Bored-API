const {ActivitySuggestion} = require('@b/models');
const utilsController = require('@b/controllers/utils');
const joi = require('@hapi/joi');
const middleware = require('@b/middleware');

const defaultTypes = ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'];

const suggestionSchema = joi.object().keys({
	activity: joi.string().required(),
	type: joi.string().valid(...defaultTypes).required(),
	participants: joi.number().min(1).required()
}).required();


module.exports = function(router) {
	router.post(['/api/suggestion/', '/api/v1/suggestion/'], middleware.validate(suggestionSchema), (req, res) => {
		let suggestion = {
			profile: {
				agent: req.header('user-agent')
			},
			activity: {
				activity: utilsController.stringSanitize(req.body.activity),
				type: req.body.type,
				participants: parseInt(req.body.participants)
			}
		};

		ActivitySuggestion.create(suggestion, err => {
			if (err) {
				res.error(err);
				return;
			}

			res.send({'message': 'Successfully created suggestion'});
		});
	});
};
