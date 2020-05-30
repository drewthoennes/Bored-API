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
	difficulty: {
		type: String,
		enum: ['easy', 'normal', 'hard'],
		default: 'normal',
		required: true
	},
	source: {
		type: String
	},
	key: {
		type: String,
		required: true
	}
}, {
	collection: 'riddles'
});

module.exports = mongoose.model('Riddle', riddleSchema);
