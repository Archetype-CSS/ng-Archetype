'use strict';

/**
 * @ngdoc function
 * @name ngArchetypeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngArchetypeApp
 */
angular.module('ngArchetypeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.tabs = [
      {
        "title": "Home",
        "content": "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliquaretro synth master cleanse. Mustache cliche temporwilliamsburg carles vegan helvetica."
        },
      {
        "title": "Profile",
        "content": "Food truck fixie locavoreaccusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velitblog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee."
        },
      {
        "title": "About",
        "content": "Etsy mixtape wayfarersethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade."
        }
    ];
    $scope.tabs.activeTab = 0;

  });



