var modelDates = function(next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
};

module.exports = modelDates;
