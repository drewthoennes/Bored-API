const express = require('express');
const bodyParser = require('body-parser');

module.exports = function(app) {
  app.get('/api', (req, res) => {
    res.json({message: 'Bored API'});
  });

  require('./activities.js')(app);
  require('./suggestions.js')(app);
}
