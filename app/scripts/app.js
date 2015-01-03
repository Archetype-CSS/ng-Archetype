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
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/main.html',
      })
      .state('docs', {
        url: '/docs',
        templateUrl: 'views/docs.html',
      })
      .state('components', {
        url: '/components',
        templateUrl: 'views/components.html'
      })
      .state('components.c-alerts', {
        templateUrl: 'views/components/c-alerts.html'
      })
      .state('components.c-buttons', {
        templateUrl: 'views/components/c-buttons.html'
      })
      .state('components.c-close', {
        templateUrl: 'views/components/c-close.html'
      })
      .state('components.c-figures', {
        templateUrl: 'views/components/c-figures.html'
      })
      .state('components.c-forms', {
        templateUrl: 'views/components/c-forms.html'
      })
      .state('components.c-icons', {
        templateUrl: 'views/components/c-icons.html'
      })
      .state('components.c-labels', {
        templateUrl: 'views/components/c-labels.html'
      })
      .state('components.c-links', {
        templateUrl: 'views/components/c-links.html'
      })
      .state('components.c-lists', {
        templateUrl: 'views/components/c-lists.html'
      })
      .state('components.c-media', {
        templateUrl: 'views/components/c-media.html'
      })
      .state('components.c-page', {
        templateUrl: 'views/components/c-page.html'
      })
      .state('components.c-partitions', {
        templateUrl: 'views/components/c-partitions.html'
      })
      .state('components.c-quotes', {
        templateUrl: 'views/components/c-quotes.html'
      })
      .state('components.c-rules', {
        templateUrl: 'views/components/c-rules.html'
      })
      .state('components.c-spacers', {
        templateUrl: 'views/components/c-spacers.html'
      })
      .state('components.c-tables', {
        templateUrl: 'views/components/c-tables.html'
      })
      .state('components.c-tabs', {
        templateUrl: 'views/components/c-tabs.html'
      })
      .state('components.c-typography', {
        templateUrl: 'views/components/c-typography.html'
      })
      .state('objects', {
        templateUrl: 'views/objects.html'
      })
      .state('objects.o-partition', {
        templateUrl: 'views/objects/o-partition.html'
      })
      .state('objects.o-button', {
        templateUrl: 'views/objects/o-button.html'
      })
      .state('objects.o-alert', {
        templateUrl: 'views/objects/o-alert.html'
      })
      .state('objects.o-nav', {
        templateUrl: 'views/objects/o-nav.html'
      })
      .state('objects.o-media', {
        templateUrl: 'views/objects/o-media.html'
      })
      .state('objects.o-close', {
        templateUrl: 'views/objects/o-close.html'
      })
      .state('objects.o-label', {
        templateUrl: 'views/objects/o-label.html'
      })
      .state('styleguide', {
        url: '/style-guide',
        templateUrl: 'views/style-guide.html',
      })
      .state('patternlibrary', {
        url: '/pattern-library',
        templateUrl: 'views/pattern-library.html',
      })
      .state('api', {
        url: '/api',
        templateUrl: 'views/api.html',
      })
      .state('testing', {
        url: '/testing',
        templateUrl: 'views/testing.html',
      })
      .state('tooling', {
        url: '/tooling',
        templateUrl: 'views/tooling.html',
      })
      .state('status', {
        url: '/status',
        templateUrl: 'views/status.html',
      });


  });

