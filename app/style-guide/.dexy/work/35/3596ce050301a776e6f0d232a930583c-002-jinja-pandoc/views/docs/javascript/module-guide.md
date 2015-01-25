# A3 Module Guide

## Tl;Dr
Modules themselves are quite simple, but their use (injection) can be more complex to understand. Since most tutorials on the matter are very basic, this will guide you through a A3 specific example.

## WTF is a Module?
AngularJS provides a method for creating [modules](https://docs.angularjs.org/guide/module). In the Angular world, modules are no more than a way to encapsulate your code into a discreet, reusable unit and give it a name. [Controllers](https://docs.angularjs.org/guide/controller), [config & run blocks](https://docs.angularjs.org/guide/module#module-loading-dependencies), [services](https://docs.angularjs.org/guide/services), [directives](https://docs.angularjs.org/guide/directive) etc. may then be added to the module. For more information on modules, see our [A3 Angular Styleguide](https://github.com/GitHubAdmin/abaqis3/blob/master/angular-styleguide.md#modules) or the [AngularJS Docs](https://docs.angularjs.org/guide/module).

## Nested Modules
A3 is divided into logical units based on features. We try to mirror these units in modules for ease of maintenance. The modules are nested in a heirarchy to imply their relationships. For example, here's part of the module hierarchy:

```
/abaqis
    /assess
    /analyze
    /improve
    /manage
        /mds
        /residents
        /team
        ...
```
In the above example, the residents module (`abaqis.manage.residents`) and is a dependency of the manage module (`abaqis.manage`) which, in turn, is a dependency of the main (`abaqis`) application module. 

```coffeescript
# abqais-module.coffee

angular
    .module( "abaqis", [
        "abaqis.assess",
        "abaqis.analyze",
        "abaqis.improve",
        "abaqis.manage", # <= manage module
        ...
    ])
```

```coffeescript
# abqais-manage-module.coffee

angular
    .module( "abaqis.manage", [
        "abaqis.manage.mds",
        "abaqis.manage.residents", # <= residents module
        "abaqis.manage.team",
        ...
    ])
```

By injecting the each module as a dependency to it's respective parent, we expose each child module's assets to the application for bootstrapping. The assets may include:

- sub modules (show, new, edit, list etc)
- [controllers](https://docs.angularjs.org/guide/controller)
- [config & run blocks](https://docs.angularjs.org/guide/module#module-loading-dependencies) (module specific routes included here)
- [directives](https://docs.angularjs.org/guide/directive)
- [providers](https://docs.angularjs.org/guide/providers)
- [filters](https://docs.angularjs.org/guide/filter)