# Front End Ops

Front End Ops....blah blah blah

# Build Process

Archetype is built on [Bower](http://bower.io), [Grunt](http://gruntjs.com), and [Git](https://github.com/Archetype-CSS). The integrated build process can be managed with the following grunt commands. 

Archetype's build process is configured with the following:
  * `config.json` - provide global path variable to use within tasks
  * `Gruntfile.js` - main Grunt config, setup to use modular tasks with [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)
  * `tasks/aliases.yml` - provide task aliases and trigger sub-tasks sequentially
  * `tasks/options/` - where the individual tasks are kept

| Grunt Task       | Description        |
| ------------- | --------------------- |
| `grunt`      | run all default grunt tasks in succession (`clean`, `compass`, `coffee`, )  |
| `grunt build`      | rebuild the project, create production assets. runs `clean`, `compass`, `coffee` |
| `grunt concat` | run only the concatenation tasks. combines all the CSS files generated by the compass task in `tmp/assets/css` and outputs a single `main.scs` file within the `public/assets/css/` directory  |


## Build Process

Archetype is built on [Bower](http://bower.io), [Grunt](http://gruntjs.com), and [Git](https://github.com/Archetype-CSS). The integrated build process can be managed with the following grunt commands. 

Archetype's build process is configured with the following:
  * `config.json` - provide global path variable to use within tasks
  * `Gruntfile.js` - main Grunt config, setup to use modular tasks with [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)
  * `tasks/aliases.yml` - provide task aliases and trigger sub-tasks sequentially
  * `tasks/options/` - where the individual tasks are kept

| Grunt Task       | Description        |
| ------------- | --------------------- |
| `grunt`      | run all default grunt tasks in succession (`clean`, `compass`, `coffee`, )  |
| `grunt build`      | rebuild the project, create production assets. runs `clean`, `compass`, `coffee` |
| `grunt concat` | run only the concatenation tasks. combines all the CSS files generated by the compass task in `tmp/assets/css` and outputs a single `main.scs` file within the `public/assets/css/` directory  |

