const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
	fact: {
		type: String,
		required: true
	},
	source: {
		type: String
	}
}, {
	collection: 'facts'
});

module.exports = mongoose.model('Fact', factSchema);
