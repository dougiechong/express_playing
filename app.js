var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Connect to the DB.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/learning_express');

// Passport.
var passport = require('passport');
var User = require('./models/user');
passport.use(User.createStrategy());

// App.
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve bower components.
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

// Routes.
require('./routes')(app);

// error handlers

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError' ||
      err.name === 'JsonWebTokenError') {
    res.status(401).json({
      error: err.message
    });
  } else {
    res.json({
      error: err.message
    });
  }
});

module.exports = app;
