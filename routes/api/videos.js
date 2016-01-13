var express = require('express');
var router = express.Router();
var debug = require('debug');
var log = debug('videos');

var Video = require('../../models/video');

// Get all videos
router.get('/', function(req, res, next) {
  Video.find({}, function(err, videos) {
    if (err) {
      return next(err);
    }

    log('all videos: %s', videos);

    res.json(videos.map(function(video) {
      return video.filtered();
    }));
  });
});

// Create a new video.
router.post('/', function(req, res, next) {
  var newVideo = Video({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description
  });

  newVideo.save(function(err) {
    if (err) {
      return next(err);
    }

    log('new video: %s', newVideo);

    res.json(newVideo.filtered());
  });
});

module.exports = router;
