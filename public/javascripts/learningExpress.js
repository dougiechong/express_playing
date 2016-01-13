var app = angular.module(
  'learning_express',
  ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
    })
    .otherwise({
      redirectTo: '/'
    })
}]);

app.controller(
  'HomeController',
  ['$scope', '$resource', function($scope, $resource) {
    var videos = $resource('/api/videos');
    videos.query(function (videos) {
      $scope.videos = videos;
    });
  }]);
