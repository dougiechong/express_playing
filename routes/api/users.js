var express = require('express');
var router = express.Router();

var User = require('../../models/user');

// Register a new user.
router.post('/', function(req, res, next) {
  var newUser = new User({
    username: req.body.username
  });

  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      return next(err);
    }

    res.json(user.filtered());
  });
});

module.exports = router;
