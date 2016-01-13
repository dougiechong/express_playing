var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var jwt = require('jsonwebtoken');
var secrets = require('../globals/secrets');
var constants = require('../globals/constants');

var userSchema = new Schema({
  created_at: Date,
  updated_at: Date
});

// Static method to generate new JWT.
userSchema.methods.jwt = function() {
  return jwt.sign(
    this,
    secrets.jwtKey,
    { expiresIn: constants.jwtLifetimeSeconds });
};

// Filtered version of object, with JWT.
userSchema.methods.filtered = function() {
  return {
    username: this.username,
    created_at: this.created_at,
    updated_at: this.updated_at,
    token: this.jwt()
  }
};

// Add dates before saving.
userSchema.pre('save', require('../helpers/modelDates'));

// Use passport to set up the password fields.
userSchema.plugin(passportLocalMongoose);

// Register with mongoose.
var User = mongoose.model('User', userSchema);

module.exports = User;
