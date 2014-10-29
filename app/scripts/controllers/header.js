'use strict';

/**
 * @ngdoc function
 * @name ngArchetypeApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ngArchetypeApp
 */
angular.module('ngArchetypeApp')
  .controller('HeaderCtrl', function ($scope) {

   $scope.aside = {
     "title": "Title",
     "content": "<p style="color:white";>Hello Aside<br />This is a multiline message!"</p>
   }; 
    
  });



