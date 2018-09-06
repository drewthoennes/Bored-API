const express = require('express');
const bodyParser = require('body-parser');

module.exports = function(app) {
  app.get('/api/*', (req, res) => {
    res.json({'error': 'Endpoint not found'});
  })
}
