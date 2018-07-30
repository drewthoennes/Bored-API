const mongoose = require('mongoose'),
	Schema = mongoose.Schema

var ActivitiesSchema = new Schema({
	activity: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  }
}, {collection: 'activities'});

module.exports = mongoose.model('Activities', ActivitiesSchema);
