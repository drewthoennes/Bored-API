const Activities = require('../models/Activities');
const keenTracking = require('keen-tracking');

const client = new keenTracking({
  projectId: process.env.KEEN_PROJECT_ID,
  writeKey: process.env.KEEN_WRITE_KEY
});

function logData(req, params) {
  if (process.env.NODE_ENV === 'dev') {
    return;
  }

  let values = {
    'protocol': req.protocol || '',
    'key': params.key || '',
    'accessibility': params.accessibility || '',
    'type': params.type || '',
    'participants': params.participants || '',
    'price': params.price || ''
  };

  client.recordEvent('endpoints', values, (err, res) => {
    if (err) {
      console.log({'error': err});
      return;
    }
  });
}

module.exports = function(app) {
  app.get('/api/activity/', (req, res) => {
    let params = {'enabled': true};
    let price = {};
    let accessibility = {};

    if (req.query.key) {
      params.key = req.query.key;
    }
    if (req.query.type) {
      params.type = req.query.type;
    }
    if (req.query.participants) {
      params.participants = req.query.participants;
    }
    if (req.query.price) {
      params.price = req.query.price;
    }
    if (req.query.maxprice) {
      price['$lte'] = req.query.maxprice;
      params.price = price;
    }
    if (req.query.minprice) {
      price['$gte'] = req.query.minprice;
      params.price = price;
    }
    if (req.query.accessibility) {
      params.accessibility = req.query.accessibility;
    }
    if (req.query.maxaccessibility) {
      accessibility['$lte'] = req.query.maxaccessibility;
      params.accessibility = accessibility;
    }
    if (req.query.minaccessibility) {
      accessibility['$gte'] = req.query.minaccessibility;
      params.accessibility = accessibility;
    }

    logData(req, params);

    Activities.countDocuments(params, function(err, count) {
      if (err) {
        if (err.name === 'CastError') {
          res.json({'error': 'Failed to query due to error in arguments'});
        }
        // Cover more errors with custom messages
        else {
          res.json({'error': err});
        }
        return;
      }
      else if (!count || count === 0)
      {
        res.json({'error': 'No activities found with the specified parameters'});
        return;
      }

      let random = Math.floor(Math.random() * count);

      Activities.findOne(params).skip(random).exec(function(err, activity) {
        if (err) {
          res.json({'error': err});
          return;
        }
        else if (!activity) {
          res.json({'error': 'No activity found'});
          return;
        }

        let formatted = {};

        formatted['activity'] = activity['activity'];
        formatted['accessibility'] = activity['accessibility'];
        formatted['type'] = activity['type'];
        formatted['participants'] = activity['participants'];
        formatted['price'] = activity['price'];
        if (activity['link'] !== "") {
          formatted['link'] = activity['link'];
        }
        formatted['key'] = activity['key'];

        res.json(formatted);
      });
    });
  });
}
