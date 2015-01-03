'use strict';

/**
 * @ngdoc function
 * @name ngArchetypeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngArchetypeApp
 */
angular.module('ngArchetypeApp')
  .controller('ArchetypeModel', function ($scope) {
    $scope.modules = getArchetypeModules;
  });



