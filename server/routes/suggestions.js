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

    if (!req.body.activity || !req.body.accessibility || !req.body.type || !req.body.participants || !req.body.price) {
      res.send({'error': 'Missing fields'});
      return;
    }

    params.activity = methods.stringSanitize(req.body.activity);
    params.accessibility = parseFloat(req.body.accessibility);
    params.type = req.body.type;
    params.participants = parseInt(req.body.participants);
    params.price = parseFloat(req.body.price);

    Suggestions.create(params, function(err, suggestion) {
      if (err) {
        res.send({'error': err});
        return;
      }

      res.send({'message': 'Successfully created suggestion'});
    });
  });
}
