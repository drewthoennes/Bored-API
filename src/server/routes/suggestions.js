const Suggestions = require('../models/Suggestions');
const keenTracking = require('keen-tracking');
const methods = require('../scripts/methods.js');

const client = new keenTracking({
  projectId: process.env.KEEN_PROJECT_ID,
  writeKey: process.env.KEEN_WRITE_KEY
});

function logData(req, params) {
  if (process.env.NODE_ENV === 'dev') {
    return;
  }

  // TODO: Fill in values
  let values = {
  };

  client.recordEvent('suggestions', values, (err, res) => {
    if (err) {
      console.log({'error': err});
      return;
    }
  });
}

module.exports = function(app) {
  app.post('/api/suggestion', (req, res) => {
    let params = {enabled: true};
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

    params.activity = methods.stringSanitize(String(req.body.activity));
    params.type = req.body.type;
    params.participants = parseInt(req.body.participants);

    Suggestions.create(params, function(err, suggestion) {
      if (err) {
        res.send({'error': err});
        return;
      }

      res.send({'message': 'Successfully created suggestion'});
    });
  });
}
