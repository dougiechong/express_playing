var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../../models/user');

// Login route.
router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    // Check if authentication failed.
    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed.'
      })
    }

    // Successful authentication.
    // Generate JWT and pass it back to the user.
    res.json(user.filtered());
  })(req, res, next);
});

module.exports = router;
