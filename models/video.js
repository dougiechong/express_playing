var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
  title: String,
  genre: String,
  description: String,
  created_at: Date,
  updated_at: Date
});

// Filtered version of object.
videoSchema.methods.filtered = function() {
  return {
    title: this.title,
    genre: this.genre,
    description: this.description,
    created_at: this.created_at,
    updated_at: this.updated_at
  }
};

// Add dates before saving.
videoSchema.pre('save', require('../helpers/modelDates'));

// Register with mongoose.
var Video = mongoose.model('Video', videoSchema);

module.exports = Video;
