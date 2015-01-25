# AngularJS Style Guide

A standardised approach for developing AngularJS applications in teams. This style guide touches on concepts, syntax, conventions. Most of it has been stolen from [other](https://github.com/toddmotto/angularjs-styleguide) [people](https://github.com/johnpapa/angularjs-styleguide), but differs slightly as we're using [CoffeeScript](http://coffeescript.org).

## Table of Contents

1. [Single Responsibility](#single-responsibility)
1. [Modules](#modules)
1. [Controllers](#controllers)
1. [Services and Factories](#services-and-factories)
1. [Directives](#directives)
1. [Filters](#filters)
1. [Publish and subscribe events](#publish-and-subscribe-events)
1. [Performance](#performance)
1. [Angular wrapper references](#angular-wrapper-references)
1. [Naming](#naming)
1. [Resources and Models](#resources-and-models)

## Single Responsibility

- **Rule of 1**: Define 1 component per file.  

    The following example defines the `app` module and its dependencies, defines a controller, and defines a factory all in the same file.  

    ```coffeescript
    # avoid
    angular
    	.module('app', ['ngRoute'])
    	.controller('SomeController', ->
    	    # controller stuff here
    	)
    	.factory('someFactory', ->
    	    # controller stuff here
    	)
    ```
    
	The same components are now separated into their own files.

    ```coffeescript
    # recommended    
    # app.module.coffee
    angular
    	.module('app', ['ngRoute'])
    ```

    ```coffeescript
    # recommended
    # someController.coffee
    angular
    	.module('app')
    	.controller('SomeController', ->
    	    # controller stuff here
    	)
    ```

    ```coffeescript
    # recommended
    # someFactory.coffee
    angular
    	.module('app')
    	.factory('someFactory', ->
    	    # factory stuff here
    	)
    ```

**[Back to top](#table-of-contents)**

## Modules

- **Definitions (aka Setters)**: Declare modules without a variable using the setter syntax. 

	*Why?*: With 1 component per file, there is rarely a need to introduce a variable for the module.
	
    ```coffeescript
    # avoid
    app = angular.module('app', [
        'ngAnimate',
        'ngRoute',
        'app.shared',
        'app.dashboard'
    ])
    ```

	Instead use the simple getter syntax.

    ```coffeescript
    # recommended
    angular
        .module('app', [
            'ngAnimate',
            'ngRoute',
            'app.shared',
            'app.dashboard'
        ])
    ```

- **Getters**: When using a module, avoid using a variables and instead use   chaining with the getter syntax.

	*Why?* : This produces more readable code and avoids variables collisions or leaks.

    ```coffeescript
    # avoid
    app = angular.module('app')
    app.controller('SomeController' , ->
        # controller stuff here
    )
    ```

    ```coffeescript
    # recommended
    angular
        .module('app')
        .controller('SomeController' , ->
            # controller stuff here
        )
    ```

- **Setting vs Getting**: Only set once and get for all other instances.
	
	*Why?*: A module should only be created once, then retrieved from that point and after.
  	  
  	- Use `angular.module('app', []);` to set a module.
  	- Use  `angular.module('app');` to get a module. 

**[Back to top](#table-of-contents)**

## Controllers

- **controllerAs syntax**: Controllers are classes, so use the `controllerAs` syntax at all times

    ```html
    <!-- avoid -->
    <div ng-controller="residents.listController">
      {{ list }}
    </div>

    <!-- recommended -->
    <div ng-controller="residents.listController as residents">
      {{ residents.list }}
    </div>
    ```
  - In the DOM we get a variable per controller, which aids nested controller methods, avoiding any `$parent` calls
  - The `controllerAs` syntax uses `this` inside controllers, which gets bound to `$scope`

- **controllerAs 'vm'**: Capture the `this` context of the Controller using `vm`, standing for `ViewModel`

    ```coffeescript
    # avoid
    angular
        .module("app")
        .controller("residents.listController", ($scope, someService) ->
            $scope.someObject = {}
            $scope.someService = someService
        )

    # recommended
    angular
        .module("app")
        .controller("residents.listController", (someService) ->
            residents = this
            residents.someObject = {}
            residents.someService = someService
            residents # return main
        )
    ```

  - Only use `$scope` in `controllerAs` when necessary; for example, publishing and subscribing events using `$emit`, `$broadcast`, `$on` or `$watch`. Try to limit the use of these, however, and treat `$scope` as a special use case

    *Why?* : Function context changes the `this` value, use it to avoid `.bind()` calls and scoping issues

- **Presentational logic only (MVVM)**: Presentational logic only inside a controller, avoid Business logic (delegate to Services)

    ```coffeescript
    # avoid
    angular
        .module("app")
        .controller("users.listController", ->
            users = this
            $http
                .get('/users')
                .success( (response) ->
                    users.list = response
                )
            users.removeUser = (user, index) ->
                $http
                    .delete('/user/' + user.id)
                    .then( (response) ->
                        users.list.splice(index, 1)
                    )
            )
            users # return model

    # recommended
    angular
        .module("app")
        .controller("users.listController", (UserService) ->
            users = this
            UserService
                .getUsers()
                .then( (response) ->
                    users.list = response
                )
            users.removeUser = (user, index) ->
                UserService
                    .removeUser(user)
                    .then( (response) ->
                        users.list.splice(index, 1)
                    )
            )
            users # return model
    ```

    *Why?* : Controllers should fetch Model data from Services, avoiding any Business logic. Controllers should act as a ViewModel and control the data flowing between the Model and the View presentational layer. Business logic in Controllers makes testing Services impossible.

- **Assigning Controllers**: When a controller must be paired with a view and either component may be re-used by other controllers or views, define controllers along with their routes. 
    
    *Note*: If a View is loaded via another means besides a route, then use the `ng-controller="Avengers as vm"` syntax. 

    *Why?*: Pairing the controller in the route allows different routes to invoke different pairs of controllers and views. When controllers are assigned in the view using [`ng-controller`](https://docs.angularjs.org/api/ng/directive/ngController), that view is always associated with the same controller.

   ```coffeescript
    # avoid - when using with a route and dynamic pairing is desired

    # app-config.coffee
    angular
        .module('app')
        .config( ($stateProvider) ->
            $stateProvider
                .when('/avengers',
                    templateUrl: 'avengers.html'
                )
        )
    ```

    ```html
    <!-- avengers.html -->
    <div ng-controller="Avengers as vm">
    </div>
    ```

    ```coffee
    # recommended

    # app-config.coffee
    angular
        .module('app')
        .config( ($stateProvider) ->
            $stateProvider
                .when('/avengers',
                    templateUrl: 'avengers.html'
                    controller: 'Avengers'
                    controllerAs: 'vm'
                )
        )
    ```

    ```html
    <!-- avengers.html -->
    <div></div>
    ```

**[Back to top](#table-of-contents)**

## Services and Factories

- All Angular Services are singletons, using `.service()` or `.factory()` differs the way Objects are created.

- **Services**: act as a `constructor` function and are instantiated with the `new` keyword. Use `this` for public methods and variables.

    ```coffeescript
    angular
        .module('app')
        .service('SomeService', ->
            this.someMethod = ->
                # do something
        )
    ```

- **Factory**: Business logic or provider modules, return an Object or closure
- Always return a host Object instead of the revealing Module pattern due to the way Object references are bound and updated

    ```coffeescript
    angular
        .module('app')
        .factory('AnotherService', ->
            AnotherService = {}
            AnotherService.someValue = ''
            AnotherService.someMethod = ->
                # do stuff
            AnotherService # return service
        )
    ```

    *Why?* : Primitive values cannot update alone using the revealing module pattern

**[Back to top](#table-of-contents)**

## Directives

- **Declaration restrictions**: Only use `custom element` and `custom attribute` methods for declaring your Directives (`{ restrict: 'EA' }`) depending on the Directive's role

    ```html
    <!-- avoid -->

    <!-- directive: my-directive -->
    <div class="my-directive"></div>

    <!-- recommended -->

    <my-directive></my-directive>
    <div my-directive></div>
    ```

    *Why?* : Comment and class name declarations are confusing and should be avoided. Comments do not play nicely with older versions of IE. Using an attribute is the safest method for browser coverage.

- **DOM manipulation**: Takes place only inside Directives, never a controller/service

    ```coffeescript
    # avoid
    angular
      .module('app')
      .controller('UploadCtrl', ->
          $('.dragzone').on('dragend', ->
              # handle drop functionality
          )
      )

    # recommended
    angular
        .module('app')
        .directive('dragUpload', ->
            restrict: 'EA'
            link: ($scope, $element, $attrs) ->
                element.on('dragend', ->
                    # handle drop functionality
                )
        )
    ```

- **Naming conventions**: Never `ng-*` prefix custom directives, they might conflict future native directives

    ```coffeescript
    # avoid
    # <div ng-upload></div>
    angular
        .module('app')
        .directive('ngUpload', ->
            # directive stuff here
        )

    # recommended
    # <div drag-upload></div>
    angular
        .module('app')
        .directive('dragUpload', ->
            # directive stuff here
        )
    ```

- Directives and Filters are the _only_ providers that have the first letter as lowercase; this is due to strict naming conventions in Directives. Angular hyphenates `camelCase`, so `dragUpload` will become `<div drag-upload></div>` when used on an element.

- **controllerAs**: Use the `controllerAs` syntax inside Directives as well

    ```coffeescript
    # avoid
    angular
        .module('app')
        .directive('dragUpload', ->
            controller: ($scope) ->
                # controller stuff here
        )

    # recommended
    angular
        .module('app')
        .directive('dragUpload', ->
            controllerAs: 'dragUpload'
            controller: ->
                # controller stuff here
        )
    ```

**[Back to top](#table-of-contents)**

## Filters

- **Global filters**: Create global filters using `angular.filter()` only. Never use local filters inside Controllers/Services

    ```coffeescript
    # avoid
    angular
        .module('app')
        .controller('SomeCtrl', ->
            this.startsWithLetterA = (items) ->
                items.filter( (item) ->
                    /^a/i.test(item.name)
                )
        )

    # recommended
    angular
        .module('app')
        .filter('startsWithLetterA', 
            (items) ->
                items.filter( (item) ->
                    /$a/i.test(item.name)
                )
        )
    ```

    *Why?* : This enhances testing and reusability

**[Back to top](#table-of-contents)**

## Publish and subscribe events

- **$scope**: Use the `$emit` and `$broadcast` methods to trigger events to direct relationship scopes only

    ```coffeescript
    # up the $scope
    $scope.$emit('customEvent', data)

    # down the $scope
    $scope.$broadcast('customEvent', data)
    ```

- **$rootScope**: Use only `$emit` as an application-wide event bus and remember to unbind listeners

    ```coffeescript
    # all $rootScope.$on listeners
    $rootScope.$emit('customEvent', data)
    ```

- Hint: `$rootScope.$on` listeners are different from `$scope.$on` listeners and will always persist, so they need destroying when the relevant `$scope` fires the `$destroy` event

    ```coffeescript
    # call the closure
    unbind = $rootScope.$on('customEvent'[, callback])
    $scope.$on('$destroy', unbind)
    ```

- For multiple `$rootScope` listeners, use an Object literal and loop each one on the `$destroy` event to unbind all automatically

    ```coffeescript
    rootListeners =
        'customEvent1': $rootScope.$on('customEvent1'[, callback])
        'customEvent2': $rootScope.$on('customEvent2'[, callback])
        'customEvent3': $rootScope.$on('customEvent3'[, callback])
    for unbind in rootListeners
        $scope.$on('$destroy', unbind)
    ```

**[Back to top](#table-of-contents)**

## Performance

- **One-time binding syntax**: In newer versions of Angular (v1.3.0-beta.10+), use the one-time binding syntax `{{ ::value }}` where it makes sense

    ```html
    # avoid
    <h1>{{ vm.title }}</h1>

    # recommended
    <h1>{{ ::vm.title }}</h1>
    ```
    
    *Why?* : Binding once removes the `$$watchers` count after the `undefined` variable becomes resolved, thus reducing performance in each dirty-check
    
- **Consider $scope.$digest**: Use `$scope.$digest` over `$scope.$apply` where it makes sense. Only child scopes will update

    ```coffeescript
    $scope.$digest()
    ```
    
    *Why?* : `$scope.$apply` will call `$rootScope.$digest`, which causes the entire application `$$watchers` to dirty-check again. Using `$scope.$digest` will dirty check current and child scopes from the initiated `$scope`

**[Back to top](#table-of-contents)**

## Angular wrapper references

- **$document and $window**: Use `$document` and `$window` at all times to aid testing and Angular references

    ```coffeescript
    # avoid
    angular
        .module("app")
        .directive("dragUpload", ->
            link: ($scope, $element, $attrs) ->
                document.addEventListener('click', ->
                    # do stuff
                )
        )

    # recommended
    angular
        .module("app")
        .directive("dragUpload", ->
            link: ($scope, $element, $attrs) ->
                $document.addEventListener('click', ->
                    # do stuff
                )
        )
    ```

- **$timeout and $interval**: Use `$timeout` and `$interval` over their native counterparts to keep Angular's two-way data binding up to date

    ```coffeescript
    # avoid
    angular
        .module("app")
        .directive("dragUpload", ->
            link: ($scope, $element, $attrs) ->
                setTimeout ( ->
                    # do stuff
                ), 1000
        )

    # recommended
    angular
        .module("app")
        .directive("dragUpload", ->
            link: ($scope, $element, $attrs) ->
                $timeout ( ->
                    # do stuff
                ), 1000
        )
    ```

**[Back to top](#table-of-contents)**

## Naming

- **`spinal-case` all files/folders**: 3rd party libraries are exempt.

    * `/this-is/a-valid-path/to/my-file.js`
    * `/none_of/this.is.valid/so_dont_do.it.js`

- **`camelCase` for variables and functions**:

    * `residentGroupIds = [1,2,3]`
    * `deleteResident = function(){...}`

- **`dot.notation` to imply hierarchy and/or inheritance**: $state names, modules, controllers, etc

    * `abaqis`, `abaqis.manage` & `abaqis.manage.residents` are valid modules and/or $state names.
    * `residents.collectionController`, `residents.manualMergeController` are valid controller names.

- **`PascalCase` for classes**:

    ```coffeescript
    class ResidentGroup
        constructor: () ->
            ...
    ```

- **`UPPER_SNAKE_CASE` for constants**:

    ```coffeescript
    angular
        .module( "abaqis.constants" )
        .constant( "ASSESSMENT_TYPES",
            "RI": "Resident Interview"
            "FI": "Family Interview",
            ...
        )
    ```

**[Back to top](#table-of-contents)**

## Resources and Models

We rely heavily on the [angularjs-rails-resource library](https://github.com/FineLinePrototyping/angularjs-rails-resource) for resource models. For example, given our residents config (note, controller as syntax):

```coffeescript
# residents-config.coffee

angular
    .module( "abaqis.residents" )
    .config( $stateProvider, ->
        $stateProvider
            ...
            .state( "abaqis.residents.list",
                templateUrl: "/templates/residents-list.html"
                controller: "residents.collectionController as residents"
             )
             ...
    )
```
...our model may be defined this way...

```coffeescript
# residents-model.coffee

angular
    .module( "abaqis.residents" )
    .factory( "Resident", (RailsResource) ->

        class Resident extends RailsResource

            @configure
                url: "/manage/facilities/{{currentFacilityId}}/residents/"
                name: "resident"

            @discharge = (resident, date) ->
                resident.status = 0
                resident.discharged = date || new Date()
                resident.save()
          
  )
```
...then used in a controller...

```coffeescript
# residents-collection-controller.coffee

angular
    .module( "abaqis.residents" )
    .controller( "residents.collectionController", (Resident) ->
        residents = this
        Resident.query().then( (response) ->
            residents.collection = response
        )
        residents
    )
```
...and in our HTML...

```html
# residents-list.html

<table>
    <tr ng-repeat="resident in residents.collection">
        <td>{{resident.first}}</td>
        <td>{{resident.last}}</td>
        <td>...</td>
    </tr>
</table>
```

**[Back to top](#table-of-contents)**

