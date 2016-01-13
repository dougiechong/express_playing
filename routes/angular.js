var express = require('express');
var router = express.Router();

// All requests redirect to angular application.
router.get('/*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
