module.exports = function(app) {
  // First declare API routes.
  // Then all others redirect to angular application.
  require('./api')(app);
  app.use('/', require('./angular'));
}
