angular.module('ngArchetype.models.archetype', [

])
  .service('ArchetypeModel', function() {
    var model = this,
        modules = [
          {
            "name": "Archetype-c-button",
            "github": "https://archetype-css.github.com/Archetype-c-button",
            "travisci": "",
            "travisbadge": "",
            "gemnasium": "",
            "codepen": "",
          },
        ];
      model.getArchetypeModules = function() {
        return modules; 
      }
  })
