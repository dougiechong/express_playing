var expressJwt = require('express-jwt');
var secrets = require('../../globals/secrets');

module.exports = function(app) {
  // Authentication.
  // Most require a token. The ones that don't are listed below.
  app.use('/api', expressJwt({
    secret: secrets.jwtKey
  }).unless({
    path: [
      { url: '/api/users', methods: ['POST'] },
      { url: '/api/sessions', methods: ['POST'] }
    ]
  }));

  app.use('/api/sessions', require('./sessions'));
  app.use('/api/users', require('./users'));
  app.use('/api/videos', require('./videos'));
}
