# Stylesheet Coding Standard

Principles for writing and maintaining stylesheets within an Archetype project

## CSS Guidelines

The purpose of this document is to outline a collection of opinionated best-practices and methodologies for building object-oriented CSS architectures that are both highly scalable and easily maintained. Encapsulation is the key to achieving these objectives of modularity which is why all entities within a design system are defined as components, even ones that are non-visual.

### General Principles

#### Whitespace and Comments
The key to portable code is in carefully documenting each component's purpose, how it works, and if necessary its intended markup pattern. Comment sections and subsections are optional, but often not needed when code is segregated into dedication Sass partials. In that case, it is perfectly acceptable to exclusively use the major and minor comment blocks. Major comment blocks should always have a trailing empty line and minor comment blocks should not.

  * Remain consistent with your use of whitespace for greater legibility of your code. Never mix spaces and tabs to adjust indentation.
  * Use soft-tabs with a two space indent. 
  * Place comments on their own line directly above the code they document.
  * Limit line length the 80 characters
  * Whenever necessary, breakup long code blocks into discrete sections
  * Avoid adding end-of-line whitespace.

Example:
```css

/**
 * Section comment block
 *
 * Comments that apply to the whole section can go here and even
 * continue on to the next line if needed
 *
 * 1. Numbered comments can also be used to attach a comment to a 
 *    specific line number
 * 2. Here's another one.
 *
 */


/** 
 * Sub-section comment block
 */


/* Basic comment */

```

#### Object-Extension Pointer
When extending an object within a separate partial, leave a comment pointing to the original base object in order to establish a concrete link between the object and its extension [[13]](addendum.md).

Example:
```css

/**
 * Foo-Bar
 *
 * 1. Extends the .foo object within _foo-object.scss
 */
 .foo--bar {...}      /* 1 */

```

#### Formating
  * Use one selector per line in multi-selector rule sets and separate each rule set with a blank line.
  * Use one space before the opening brace of a rule set and place the closing brace of a rule set in the same column as the first character of the rule set and use one space after the colon of a declaration.
  * Include one declaration per line and one level of indentation for each declaration.
  * Use lower-case hex color codes, i.e. `#ffffff`.
  * Use double quotes for quoted attribute values in selectors, i.e. `input[type="checkbox"]`
  * Where allowed, avoid specifying units for zero-values, i.e. `margin: 0;`.
  * Follow every comma with a space for comma-separated property values and include a semi-colon at the end of the last declaration in a declaration block.
  * Declarations should be grouped by their function - positioning rules, box-model rules, etc.

##### Exceptions:
Large blocks of single declarations can use a slightly different single-line format. In this case space should be included after the opening brace and before the closing brace.

Example:

```css

  .selector-1 { width: 10%; }
  .selector-2 { width: 20%; }
  .selector-3 { width: 30%; }

```

Long comma-separated property values, such as collections of gradients or shadows, can be arranged across multiple lines in an effort to improve readability and produce more useful diffs [[3]](addendum.md).

Example:

```css

.selector {
  background-image:
    linear-gradient(#FFFCCC),
    linear-gradient(#F3C4EC);
  box-shadow:
    1px 1px 1px #000,
    2px 2px 1px 1px #CCCCCC inset;
}

```

###### Units
When building a responsive design system always try to use relative units to allow system components and font-size to scale to the user's viewport. Use pixels only when you have a really good reason NOT to use em's (or rems with fallback and abstract this into a Sass mixin).
Use unit-less line-height. It does not inherit a percentage value of its parent element - it's based on a multiplier of the font-size.
Avoid absolute measurements. For example, by using .dropdown-nav li:hover { top: 37px; } you are coding a single point of failure into your interface. Instead, build with flexibility in mind by using .dropdown-nav li:hover { top: 100%; } [[13]](addendum.md).
Consider using [Modular Scales](http://alistapart.com/article/more-meaningful-typography) to help define your proportional rhythms within your designs. The [Sassy Modular](https://github.com/Team-Sass/modular-scale) Scale Ruby Gem makes working with Modular Scales easy.
 } }

>"By using culturally relevant historically pleasing ratios to create modular scales and basing the measurements in our compositions on values from those scales we can achieve a visual harmony not found in layouts that use arbitrary convention or easily divisible numbers." - [Tim Brown](https://twitter.com/nicewebtype)


#### Vendor Prefixes

Don’t specify vendor prefixes in the authoring style sheets. The level of browser support you require will change over time (resulting in redundant code in your authoring style sheets). The prefixing of CSS properties can be handled in a couple of lines with an automated tool and will be more accurate than you.[[30]](addendum.md)


## Sass Guidelines

The guidelines here should be taken in context with the CSS Guidelines as each of these are inter-related. This document will focus primarily on the usage of Sass to implement OOCSS/SMACSS principles. Without those underlying fundamentals, Sass will only complicate and compound the issues involved in a poorly constructed CSS architecture. Additionally, improper Sass implementation can easily lead to bloated output and lengthy selectors which not only inflates file size, but also causes JavaScript to work less efficiently causing performance issues for end users. The following guidelines are intended to help ensure user centered goals and performance always take precedence over developer convenience when building with Sass.

## General Principles
  * SCSS syntax is preferred, but always omit file prefixes when including partials to allow for easy conversion between SCSS and Sass syntaxes.
  * Use an abstraction layer or library (i.e. Compass) to consistently apply CSS3 vendor prefixes and allow for easy updates.
  * Leave your generated CSS file uncompressed until production and monitor it closely to ensure you aren't introducing bloated code or overly verbose selector strings.
  * Prefix custom functions and mixins to avoid collisions with other frameworks or plugins.
  * Compass image files extension helper and sprite generator is your friend.

### Comments

SCSS supports both invisible and visible comments.

Use // comment syntax to omit comments from output.
  * Use the standard /* */ CSS comments in your SCSS to keep comments in the CSS output unless output is set to compressed in which case all comments will be stripped out.
  * Use the /*! */ comment syntaxto ensure comments will remain regardless of output setting.

#### Don’t put markup patterns in comments

Comments are good. Indeed, writing lots of meaningful comments is encouraged. However, refrain from entering examples of intended markup in the comments of style sheets. They immediately create a scenario where information is likely to become obsolete and confusing. Instead, the template stub that sits alongside the style sheet should provide all the markup. As this template is necessary for the application to function, it is by nature always up to date and provides a more meaningful reference. [[30]](addendum.md).


~~### Nesting Selectors
  * Limit nesting to two or three levels deep. Reassess any nesting more than two levels deep. This prevents overly-specific CSS selectors.
  * Avoid large numbers of nested rules. Break them up when readability starts to be affected.
  * When nesting, list your parent specific declarations directly under the class selector and then list the indented child selectors
  * Only use nesting when you intend for nested CSS selectors.
  * Never emulate HTML structure of a module with SCSS nesting. Mapping Sass selectors directly to your DOM structure creates a brittle architecture that is tightly coupled to the current HTML markup.
  * Nested parent selectors should be listed directly under the class selector and then indent child selectors [[17]](addendum.md).

Example:~~

```scss
// sass example...
```

### Variables
  * Use a variable for any repeated CSS value and look for patterns to abstract in order to reinforce maintainabilityas well as consistency.
  * Prefix color variables rather than using the specific color namei.e. $brand-blue opposed to $blue.
  * When defining a color tonetintor shade of a previously defined color variable the modifier should follow the initial variable name and use -- (double dashes) to represent the modifieri.e. $brand-blue--light opposed to $light-brand-blue.
  * Avoid explicitly assigning a property to a color variable name. Create two levels of abstraction - the lower level abstraction defines the color name; and the higher level abstraction defines the component property.

Example:
```scss
$brand-gray:            #999999;
$brand-gray-light:      #E5E5E5;

$nav-color-primary:     $brand-gray;
$nav-color-secondary:   $brand-gray-light;
```

  * When defining variables, they should appear first at the top of their component's partial file and be grouped by skin and structure.
  * 'Global' variables, those used by many components within multiple different partial files, should be given their own partial file inside the base/directory for example: _color-pallet.scss_typography-pallet.scss.

### Variable Syntax
Use the same [BEM-style syntax](https://github.com/Archetype-CSS/Archetype-docs/blob/master/architecture.md#selector-construct) used for CSS selectors, i.e. $object__element--property: css-value;. Variable names should list there common properties first followed by unique properties.

Example:
```scss

/**
 * Button Skin Variables
 */
$btn--color-bg:                               pink;
$btn--color-txt:                              pink;

/* Button State Variables */

$btn--color-bg-hover:                         darken($btn--color-bg10%);
$btn--color-bg-disabled:                      lighten($btn--color-bg25%);

```

### Using @mixin

  * Use a @mixin when you wish to apply arguments to its code blockwhen you want that chunk of styles to apply to the selectoror when you don't want an additional class in the HTML.
  * When writing mixinslimit arguments to 4 unless you have a good reason for additional complexity.
  * Use a small number of property-value pairs because they will be output everywhere the mixin is called and potentially bloat your code base.
  * Mixins with multiple arguments can be placed on their own line for greater readability.
  * As alwaysmonitor the CSS output to ensure it matches the intention of your Sass code.

Example:
``scss

@mixin mixin-name(
  $mixin-arg1,
  $mixin-arg2,
  $mixin-arg3,
  $mixin-arg4) {
    property: $mixin-arg1;
    property: $mixin-arg2;
    property: $mixin-arg3;
    property: $mixin-arg4;
}

```


### Using @extend

  * @extend when you want to extend
  * Use @extend when no arguments are necessary.
  * Be cautious using @extend. Improper usage can easily cause bloated output and/or extremely lengthy selector strings.
  * Never nest an @extend within another @extend
  * Avoid using @extend within a mixin - this can easily lead to nested @extend's
  * Never use @extend for the simplification of (OOCSS) multi-class constructs to build single-class objects. This is dangerous because it can easily produce very bloated output and complicated selector strings. This technique should be avoided until a native browser implementation of @extend is available[[29]](addendum.md).

Don’t extend anything other than a placeholder selector (e.g. %Placeholder) and don’t place any nested styles within the place holder. It seldom creates the CSS you imagine. [[30]](addendum.md)

Example misuse of @extend:
```scss

//this is a terrible example...produces bloated css...fix this you idiot!!
.btn-signup {
  @extend btn;
  @extend btn--full;
  @extend btn--large;
  @extend btn--primary;
}

```

### Using %Place-holder Selectors
  Use % (the silent selector) when defining a utility class that may not be used - this will keep its code block out of the output until it is extended.

### Property Ordering
Consistent ordering of @-rules and properties leads to increased readability and more meaningful diffs.

  1. Variables
  2. @-Rules (extends first followed by mixin includes)
  3. Properties
  4. State Stylesi.e. &.is-active
  5. Object Elementsi.e. nav__item

Example:
```scss
.selector {
  @extend %utility-class;
  @include mixin-name(mixin-arguments);
  property: value; 
  &.is-disabled {
    @include disabled-mixin(mixin-arguments);
    property: value;   
  }
  & > object__element {
    @extend %utility-class;
    property: value;
  }
}
```

### Sass Packages and Modules

  * Every Sass module must have a name-space consistently applied as a prefix to avoid collisions with other modules. Prefix should be shortyet descriptive.
  * Importing a module should not render any selectors
  * A Sass module should be broken up by functionality so that components of the package can be imported separately, i.e. `@import "compass/css3";`
  * Avoid global variables when possible and use name-spaces when they are necessary.
  * Use placeholders selectors whenever possible.
  
### Keep Sass Code as simple as possible

a mixin for creating buttons that requires three or more arguments to be passed just to set border styles, background colour and text size is probably a needless over complication. [[30]](addendum.md) [[31]](addendum.md).

## Always monitor CSS output

>"Preprocessors do not output bad code. Bad developers do." - [Hugo Giraudel](http://hugogiraudel.com/)

Our beautifully crafted Sass code is never read by the browser. Always keep an eye on it's output, run through it manually, and process with [CSSlint](https://github.com/CSSLint/csslint) to catch any troublesome output / selectors / etc.. There are almost always unintended chunks of code. Failure to check the final product you are producing is a sure fire way to create sub-standard CSS files. [[30]](addendum.md).



