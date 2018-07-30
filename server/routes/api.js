const express = require('express'),
  bodyParser = require('body-parser'),
  configFile = require('../config'),
  Activities = require('../models/Activities');

module.exports = function(app) {
  app.get('/api', (req, res) => {
    res.json({message: 'Bored API'});
  });

  app.get('/api/random', (req, res) => {
    Activities.count({}, function(err, count) {
      if (err || !count) {
        res.json({'error': err});
        return;
      }

      let random = Math.floor(Math.random() * count);

      Activities.findOne().skip(random).exec(function(err, activity) {
        if (err || !activity) {
          res.json({'error': err});
          return;
        }

        let formatted = {};

        formatted['activity'] = activity['activity'];
        formatted['key'] = activity['key'];

        res.json(formatted);
      });
    });
  });

  app.get('/api/:key', (req, res) => {
    Activities.findOne({'key': req.params.key}, function(err, activity) {
      if (err || !activity) {
        res.json({'error': err});
        return;
      }

      let formatted = {};

      formatted['activity'] = activity['activity'];
      formatted['key'] = activity['key'];

      res.json(formatted);
    });
  });
}
