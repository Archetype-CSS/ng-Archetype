# A3 File/Folder Structure & Naming Conventions

## Tl;Dr
This document seeks to answer the simple question, "Where the F@#K is that file?!". Our approach is influenced by the ["Modularity" example in this article](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript#modularity). For more information on modules, see the [Angular Style Guide](https://github.com/GitHubAdmin/abaqis3/blob/master/angular-styleguide.md#modules).

## Folder Structure
Files are generally organized one of two ways.

- In a module folder that is specific to an application function (residents, MDS, users, etc), or...
- In a shared folder if it's a reusable resource (components, images, directives, services etc) 

```
app/
|__assets/
   |__common/
      |__fonts/
      |__images/
      |__javascripts/
         |__directives/
         |__filters/
         |__services/
         |__...
   |__components/
      |__facility-switch/
      |__primary-navigation/
      |__secondary-navigation/
      |__...
   |__manage/
      |__residents/
         |__nh-stays/
         |__completed-assessments/
         |__mds-assessments/
         |__...
      |__users/
      |__mds/
      |__...
   |__assess/
   |__analyze/
   |__improve/
   |__...
```

## File/Folder Naming Conventions
All file and folder names should be `spinal-case` (third party libraries are exempted). For example…

- `/manage/qa-cycles/qa-cycles-module.js`
- `/manage/residents/residents-auto-merge.html`
