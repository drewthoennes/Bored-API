const express = require('express');
const bodyParser = require('body-parser');

module.exports = function() {
  let router = express.Router();

  router.get('/api', (req, res) => {
    res.json({message: 'Bored API'});
  });

  require('./activities.js')(router);
  require('./suggestions.js')(router);
  require('./error.js')(router);

  return router;
}
