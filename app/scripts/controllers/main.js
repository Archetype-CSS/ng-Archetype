'use strict';

/**
 * @ngdoc function
 * @name ngArchetypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngArchetypeApp
 */
angular.module('ngArchetypeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
