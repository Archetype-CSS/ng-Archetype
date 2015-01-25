# A3 Front End Build Tools & Process

## Tl;Dr

The Rails Asset Pipeline is too restrictive for our needs so we killed it. This doc attempts to explain how we now preprocess, concatenate, minify and or move all our front end file resources (HTML, CSS, Javascript, images, fonts, locales etc).

## Table of Contents

1. [Tools](#tools)
1. [Build Process](#build-process)
1. [LiveReload](#livereload)
1. [Having Problems?](#having-problems)

## Tools

###Node ([install node.js](http://nodejs.org/download/))
Node is the foundational tool for the front end build. Our other tools (bower, gulp etc) rely on it. Install node before the following tools.

### Node Package Manager ([install npm](http://howtonode.org/introduction-to-npm))
This allows you to manage the various node packages required for our shenanigans. Install this after you install node. Then run `npm install` to install all the required node packages (listed in the project's `package.json` file).

### Bower (`sudo npm install -g bower`)
We use [Bower](http://bower.io) as our front end package manager. For example, the command `bower install angular` will give us the latest version of angular. Running just `bower install` will install all required packages (listed in the project's `bower.json` file).

### Gulp (`sudo npm install -g gulp`)
[Gulp](http://gulpjs.com) is our build tool. Using tasks we define (in `gulp-file.coffee`), it handles all preprocessing of SASS and CoffeeScript files and allows us to build final, versioned files for the browser.

## Build Process

The build process creates versioned files in the `/public` folder for the browsers consumption and updates any references to the files where applicable. Examples (where [hash] is an 8 character version checksum like "9936ad41"):

- `/app/assets/manage/manage-controller.coffee` will be processed and concatenated with all other application JS files and saved to `/public/javascripts/app-[hash].js`. The `<script/>` tag in the main layout file (`/app/views/layouts/application.html.erb`) will be updated to match the newly generated URL.
- `/bower-components/angular/angular.js` will be concatenated with all other vendor JS files and saved to `/public/javascripts/vendor-[hash].js`. The `<script/>` tag in the main layout file (`/app/views/layouts/application.html.erb`) will be updated to match the newly generated URL.
- `/app/assets/manage/manage.html` will be moved to `/public/templates/manage-[hash].html`. Any angular routing config file that refers to this template will be updated to match the newly generated URL.

### Commands
If you just make a quick, one change to a front end resource (locales, html, css, js, images, fonts) run `gulp` to process the changes and then reload your browser when it's complete. If you plan on making multiple changes, run `gulp watch` first, and any following changes will be processed automatically. Typically, after pulling latest I run `gulp` followed by `gulp watch` to start with a clean slate and to catch any changes I make.

## LiveReload
I **highly** recommend you [install the appropriate LiveReload plugin](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) for your browser(s) of choice. This will automatically reload your web browser after changes have been made and the related gulp tasks have completed. It's much quicker than the typical manual save/refresh approach.

## Having problems?
If you can't seem to get up and running (browser console errors, page not rendering etc), try starting with a clean slate by doing the following:

- Delete the `/bower_components` folder
- Delete the `/node_modules` folder
- run npm install
- run bower install
- run gulp
- run gulp watch

At this point, you should have all the latest resources and be up and running. If you're still having issues, take a look at the [A3 Troubleshooting](https://github.com/GitHubAdmin/abaqis3/blob/master/troubleshooting.md) guide.
