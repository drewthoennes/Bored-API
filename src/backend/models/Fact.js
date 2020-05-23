const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
	fact: {
		type: String,
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
	collection: 'facts'
});

module.exports = mongoose.model('Fact', factSchema);
