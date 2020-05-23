const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	key: {
		type: String,
		required: true
	}
}, {
	collection: 'websites'
});

module.exports = mongoose.model('Website', websiteSchema);
