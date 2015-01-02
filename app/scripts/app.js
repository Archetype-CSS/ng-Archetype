'use strict';

/**
 * @ngdoc overview
 * @name ngArchetypeApp
 * @description
 * # ngArchetypeApp
 *
 * Main module of the application.
 */
angular
  .module('ngArchetypeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('/about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('components', {
        url: '/components',
        templateUrl: 'templates/components.html'
      })
      .state('components.component', {
        url: '/components/:component',
        templateUrl: 'templates/components.comoponent.html',
        controller: 'ComponentsCtrl'
      });

  });
