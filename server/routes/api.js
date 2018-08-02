const express = require('express'),
  bodyParser = require('body-parser'),
  configFile = require('../config'),
  Activities = require('../models/Activities');

module.exports = function(app) {
  app.get('/api', (req, res) => {
    res.json({message: 'Bored API'});
  });

  app.get('/api/activity/', (req, res) => {
    let params = {'enabled': true};

    if (req.query.key) {
      params.key = req.query.key;
    }
    if (req.query.type) {
      params.type = req.query.type;
    }
    if (req.query.participants) {
      params.participants = req.query.participants;
    }

    Activities.count(params, function(err, count) {
      if (err) {
        res.json({'error': err});
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
