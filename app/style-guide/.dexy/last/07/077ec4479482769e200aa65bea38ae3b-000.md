# Architecture

>"By categorizing CSS rules we begin to see patterns and can define best practices around each of these patterns" -  [Jonathan Snook](http://smacss.com/book/categorizing)

## Directory Structure

Most of Archetype's modules (utilities, objects, and components) are managed with [Bower](http://bower.io) within the `bower_components/` directory. It is a best practice to [version control Front-End packages](http://addyosmani.com/blog/checking-in-front-end-dependencies/). These modules are `@import`-ed into a project, customized to your needs, and controlled by [Archetype](https://github.com/Archetype-CSS/Archetype).

<pre>
Archetype/ 
|- node_modules/
|- bower_components/
|
|– sass/ 
|   |– _main.scss
|   |- components/
|   |- layout/
|   |- style-guide/
|   |- temp/
|
|- style-guide/   
|- performance/
|
|- .csslintrc
|- .scss-lint.yml
|- .travis.yml
|- bower.json
|- config.rb
|- Gruntfile.js
|- package.json
|- phantomas-config.json
|- README.md
</pre>

### `/sass/main.scss`

Partials should be used for all styles. These partials are then `@import`-ed into `main.scss` which provides the opportunity to easily enable/disable design system modules as needed. When including partials within your `main.scss` stylesheet, leave off the file extension to allow for easier conversion between Sass and SCSS syntaxes if you ever need to do so [[17]](addendum.md). This file also contains styles and settings that apply to the entire project, as well as [compass](http://compass-style.org/) configuration and compass plugins. 

Example: [Archetype's main.scss](https://github.com/Archetype-CSS/Archetype/blob/master/sass/main.scss)

### `/sass/components/`

Components are modular and reusable entities of a design system. Everything within the design system is a component. Each component is maintained within its own repository, managed with [Bower](http://bower.io), and `@import`-ed into `main.scss`. All objects are prefixed with `o-`. They are installed using `bower install Archetype-c-[object-name]`. Archetype components have basic, default structure and skin styles applied for rapid prototyping. These default styles can be easily over-ridden. Archetype components are the equivalent to Modules within the [SMACSS](http://smacss.com/) methodology. Sub objects are defined in the same partial as the object they extend/modify.

Example: [Archetype's Components](https://github.com/Archetype-CSS?query=Archetype-c-)

### `/sass/bower_components`

This is where all Archetype modules are downloaded by [Bower](http://bower.io). It is a best practice to [version control Front-End packages](http://addyosmani.com/blog/checking-in-front-end-dependencies/). 

### `/sass/layout/`

Layout styles provide structure to mobile-first, linear content. These styles are used to progressively enhance the basic layout when device capability and/or viewport allow. Because layout is treated as an enhancement, these styles are kept separate from the components they enhance and are applied with their own class. Each component's layout is defined in its own partial inside the layout directory. Layout stylesheets are named by prefixing the component's name with `l-` in order to explicitly define the relationship between layout and component.

### `/sass/temp/`

The temporary directory contains any styles that haven't yet been properly defined and organized within the project's architecture. This where any hacks or quick fixes belong. Each 'fix' placed within this directory should be given its own partial and should be accompanied by a corresponding issue properly tagged and filed in the project's repository so that it can be incorporated into the code base at a later date. Preventing sub-standard code from being committed into the code base helps to prevent unnecessary depreciation as well as unintentionally introducing bugs by keeping these 'fixes' quarantined within the temp directory. [[25]](addendum.md).




---

# Object Oriented CSS (OOCSS)

>"[A] CSS “object” is a repeating visual pattern which can be abstracted into an independent snippet of HTML CSS and possibly JavaScript. Once created an object can then be reused throughout a site." - [Nichole Sullivan](https://twitter.com/stubbornella)

### Two Main Principles of OOCSS

  1. **Separation of Structure from Skin** - distinguish between structure styles (box-model) and skin styles (color, font, gradients) and abstract these styles in class-based modules to allow re-use [[6]](addendum.md).
  2. **Separation of Container and Content** - avoid all explicit parent-child relationship within style declarations so that a component's style is not dependant upon its container which allows the module to be reused [[6]](addendum.md).
  
These are the basic concepts Archetype modules are built on. Also see: [Archetype Design Principles](/designPrinciples.md). 


### Utilities
Archetype utilities are low-level abstractions used globally throughout a design system via a class, function, or mixin to provide specific functionality. Utilities are maintained within their own repository, managed with [Bower](http://bower.io), and are `@import`-ed within `main.scss`. All utilities are prefixed with `Archetype-u-`. They are installed using `bower install Archetype-u-[utility-Name]`. Utilities are applied within the stylesheets, rather than the markup. They reside within `bower_components` once installed.

Example [Archetype Components](https://github.com/Archetype-CSS?query=Archetype-u-)

### Objects
Object styles are generic abstractions that can be extended to build a component. They are styles which remain consistent and unchanged within a component regardless of skin or structure and are abstracted to be used as a foundation for building UI components. The classic OOCSS example is the media-object [[16]](addendum). Each object is maintained within its own repository, managed with [Bower](http://bower.io), and `@import`-ed into `main.scss`. All objects are prefixed with `Archetype-o-`. They are installed using `bower install Archetype-o-[object-name]`. They reside within `bower_components` once installed.

Example [Archetype Components](https://github.com/Archetype-CSS?query=Archetype-o-)

#### Object Modifiers
An object modifier in Archetype is a context-dependant sibling of an object that performs a certain function and is represented by an additional HTML class attribute on the element. Object modifiers are denoted by the use of `__` (double underscores) for example, `.objectName__modifierName` in order to maintain context, maintain control of the cascade, and avoid location-dependant selectors [[2]](addendum.md). Object modifiers extend or provide minor overrides to the object and is often applied to the same HTML element or a direct decendent. An object modifier is defined in the same partial as the object it modifies. 

### Components

A discrete and independent entity designed to exist as a stand alone module without any dependencies to its container. A component can be simple or compound (contain one or more components) and it should be able to be relocated on the page without breaking [[1]](addendum). Example components include buttons, navigation, etc. An example of a compound component would be a search block composed of an input and a submit button [[2]](addendum.md), but these are still considered components. Components are unique in the way that they are installed via [Bower](http://bower.io), but can still be modified to accept custom styles. This is done by redefining the components settings file (which contains a [Sass Map](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) of all the CSS property value pairs passed to the component). The partial containing a component's redefined settings should be properly namespaced and located in the `components` directory. 

Example [Archetype Components](https://github.com/Archetype-CSS?query=Archetype-c-)

In order to maintain modularity a component must adhere to the following:

  * Component styles must not declare any explicit size constraints, allowing the module to scale to it's parent container. A component can be placed inside a layout component, i.e. a grid; or extended with a layout class, but it must never be given an explicit width.
  * A component must remain independent from siblings, children, and parents allowing for arbitrarily placement within a design system. This means that CSS ID Selectors must be avoided to allow components to remain non-unique (able to appear on the same page more than once).
  * A component's name must be unique to the project to ensure that only instances of the same component can have the same name. Re-using a component also means re-using its behavior. To use the same component with differing behavior requires a new component.
  * Selectors must remain context free and un-coupled to HTML by avoiding the use of elements within CSS selectors. HTML element styles are scoped by placing a class on either the element itself or on a parent container. This means all HTML element styles are opt-in (opposed to opt-out) making the only "default" HTML element styles are those applied by [normalize](http://necolas.github.io/normalize.css/), thus avoiding redundant overrides. [[27]](addendum.md) [[28]](addendum.md)

#### State
A state is a variant of a component that is triggered by an action or behavior. State styles are applied dynamically as an additional HTML class attribute on the component's root or child HTML element. State based styles are indicated with the `is-` prefix, for example `.is-active` or `.is-disabled`. These style declarations are shared by CSS and JS files [[1]](addendum.md) and are defined with the component in the same partial. Multiple states may be used at once on the same component. In Archetype, state styles are defined in the same component partial of which they modify. For a good sample, see: [Archetype-c-button](https://github.com/Archetype-CSS/Archetype-c-button)


## Component Composition (OOCSS Classes)

>component composition is the building of the discrete modules of a system using common, object oriented, abstractions represented as an additional HTML class attribute. 

Building complex components with smaller, abstracted code blocks leads to more reusable code, easier debugging, and a DRYer code base while cutting down on repetition and increasing performance. It also allows for easier prototyping within the browser when skin and structure styles can be applied to a component separately. A component is comprised of object, structure, and skin. Class naming and selector construct is very important. This syntax and naming convention illustrates the intention of a class and its relationship to others.

Components use a multi-class pattern in order to allow for easier contextual based adjustments when necessary, and to help simplify class and variable names[[3]](addendum.md). For example, structure, skin, and state styles are extended via their own class, rather than attaching a suffix to an existing component class.

In this way a component can be thought of as a specific combination of classes. Changing even one of these classes constitutes an entirely different component. For example, the same button component with two different skin classes is actually two different components. Additionally, an object could be represented as a single class or even a Sass `@extend` such as a `%u-cf`. A component does not have to be a visual entity.


### Structure Styles
Styles which control a component's physical structure. Structure styles include any properties involving spacing which could potentially affect surrounding elements on the page, i.e. box-model properties. Structure classes extend an object class. There must be no dependencies between structure and skin.

### Skin Styles
Styles which control a component's visual appearance. Skin styles include any properties involving color, typography, gradients, shadows, etc. Skin classes extend an object class. There must be no dependencies between skin and structure.

*Note: Sometimes the distinction between structure and skin is non-trivial. For example, the arrival of border-box has greatly simplified the box-model, but makes the border property a bit more difficult to define in this context because it no longer contributes to an element's width (structure). The best way to handle this is to split up border property defining `border-width` and `border-style` as structure and `border-color` as skin. An example that makes this more clear is when building a tab component where the structure of the tab requires a transparent bottom border for the active tab and the skin of the tab requires a light gray border.*

### Layout Styles
Styles that define how/where a component sits on the page. A component's layout class uses the `l-` prefix followed by the component's name [[1]](addendum.md). Layout styles include width and grid layout.

  * All components are fluid by nature and should never be given explicit width or height restraints. A component's width is determined by its parent container or grid system.
  * Heights should only be explicitly defined for elements which had dimensions before they entered the system; i.e. image, video. In all other cases use `line-height` instead which is far more flexible [[13]](addendum).
  * The grid system should never have styles or box-model properties directly applied - grid items contain content, but are not content in of themselves.

### Icons
  * Icons should be styled as independent entities to allow their use in any component without the need for duplication of code.
  * Icon components are prefixed with `i-`.
  * Icon styles should be split into structure and skin (`.i-small` & `.i-primary` classes) in order to allow for maximum flexibility and minimal code repetition [[1]](addendum.md).
  * Use [Compass to manage sprits](http://compass-style.org/help/tutorials/spriting/).
  * Sprited Icons should be added to empty elements that have their text hidden off canvas.
  * Use [Compass URL Helpers](http://compass-style.org/reference/compass/helpers/urls/) to manage asset directories


### JavaScript
  * Custom `data-` attributes are reserved for applying dynamic behavior to a component. This keeps behavior out of the class attribute where component composition takes place. 
 * A `data-` attribute should never be referenced in a stylesheet. They are used exclusively for JavaScript files [[3]](addendum.md). Keeping these concerns separated makes development easier.
 * In cases where `data-` atributes are undesirable, use a `.js-` prefix to communicate that this class adds behavior and must not be styled.

### QA
  * The only acceptable use of the HTML ID attribute is for the integration of quality assurance tooling.  Dedicating the ID attribute, as well as name-spacing these hooks with `qa-` ensures that they will never be used for any other purpose or accidentally removed from the markup. 
  * The prefix indicates the ID’s purpose, the number appended after the dash can be dynamically generated so every element has a unique identifier to build testing scripts for.


## Class Semantics

>"We shouldn't be afraid of making the connections between layers clear and explicit rather than having class names rigidly reflect specific content. Doing this doesn't make classes "unsemantic," it just means that their semantics are not derived from the content." - [Nicolas Gallager](https://twitter.com/necolas)

Class names should remain content-independent[[3]](addendum.md). By avoiding tightly coupled class names and content semantics, code is more easily reused and modularized to allow for increased scalability of your architecture. Because the most reusable code components are those with content-independent class names, class names should be derived from repeating structural or functional patterns and never from the content.

  1. Increasing semantic value of a section of html and content [[1]](addendum)
    * Content-layer semantics are served by html elements and attributes [[3]](addendum)
  2. Class names communicate useful information to developers and serve hooks for CSS or JavaScript [[3]](addendum.md).
    * Decrease the expectation of a specific HTML structure [[1]](addendum).

The important distinction is that the HTML class attributes are semantic in the way they convey meaning to the developer, rather than the content. Content receives it's semantic value from its markup (HTML tags and ARIA attributes). Code receives its semantic value from its classes.


### Selector Construct and Naming Conventions
Selector construct must explicitly communicate the context and function of the entity being named. Also, selector construct must be consistently applied to allow for efficient use of grep and more meaningful diffs. The BEM Methodology [[2]](addendum.md) and interpretations of BEM [[3]](addendum.md) [[13]](addendum.md) [[26]](addendum.md) make use of an efficient system to accomplish these goals by explicitly communicating the function and context of the entity being named, as well as its relationship to both child and parent components while avoiding deeply nested selectors that tie content to container and make assumptions about markup. In this way, a BEM-like system helps to reinforce our primary objective of modularity.
Admittedly, there is an element of added complexity, but the sacrifice of simple selectors in order to preserve objected oriented principles is well worth it, especially considering that the GZIP algorythm handles repetition extremely well.

An effective naming convention explicitly communicates the context and function of the entity being named.  Archetype relies on a structured, BEM-like[[2]](2) naming convention for building class names using meaningful hyphens, underscores, and cammelCase syntax to communicate the relationship between classes and their place within the system. There is a major division between objects, components, and utilities, as well as a minor separation of responsibilities built on top.

### Naming Pattern

This naming pattern is inspired by the BEM Methodology [[2]](addendum.md) as well as several interpretations by other developers [[3]](addendum.md) [[26]](addendum.md).

**Object:** represents the higher-level abstraction of a component 

Naming Pattern:
<pre>
<code>
.o-objectName {...}
</code>
</pre>
Example:

** insert idio template call to nav object here **

**Object Modifier:** a minor modification of an object

Naming Pattern:

<pre>
<code>
.o-object__objectModifier {...}
</code>
</pre>

Example:

** insert idio template call to nav__vertical object modifier here **


**Component:** multi-class pattern for creating discrete UI modules 

Naming Pattern:

<pre>
.primaryNav {...}
.primaryNav__item {...}
</pre>

Example:

** insert idio template call to component example (button?) here **

**State:** represents a change in the component's state

Naming Pattern:

<pre>
<code>
.component--extension {
  & .is-active {...}
}          
</code>
</pre>

Example:

** insert idio template call to button component here **



**Component Extension:** used to apply skin and/or structure styles to a component

Naming Pattern:

<pre>
.primaryNav--structure {
  // structure styles extending the primaryNav component
}

.primaryNav--skin {
  // skin styles extending the primaryNav component
}
</pre>

Example:

** insert idio template call to component extension example (button?) here **


**Layout:** styles that define how and where a component is placed on the page

Naming Pattern:

<pre>
.l-primaryNav {
  // primaryNav layout styles here
}
</pre>

Example:

** insert idio template call to component example (button?) here **


### Icons

Example:

```
<span class="i-account">My Account</span>
```

### JavaScript

Example:

<pre>
<code>
<ul class="nav nav__vertical primaryNav--large primaryNav--primary l-primaryNav" data-nav="primaryNav">
  <li class="primaryNav__item is-active">...</li>
</ul>
</code>
</pre>


### QA

Example:

```
<button id="qa-1234" class="btn btn--large btn--success">Click Here Stupid</button>
```
