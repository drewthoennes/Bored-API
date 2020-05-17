const mongoose = require('mongoose');

const riddleSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true
	},
	answer: {
		type: String,
		required: true
	},
	source: {
		type: String
	}
}, {
	collection: 'riddles'
});

module.exports = mongoose.model('Riddle', riddleSchema);
