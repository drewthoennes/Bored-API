const mongoose = require('mongoose');

var suggestionSchema = new mongoose.Schema({
	activity: {
		type: String,
		required: true
	},
	accessibility: {
		type: Number
	},
	type: {
		type: String
	},
	participants: { // 1 - n
		type: Number
	},
	price: { // 0.0 - 1.0
		type: Number
	},
	enabled: {
		type: Boolean,
		required: true
	},
	name: {
		type: String
	}
}, {
	collection: 'suggestions'
});

module.exports = mongoose.model('Suggestions', suggestionSchema);
