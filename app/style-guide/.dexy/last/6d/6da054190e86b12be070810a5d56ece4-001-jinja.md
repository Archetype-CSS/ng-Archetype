# Archetype Design Principles

### Specificity

>"The problem with such a depth is that it enforces a much greater dependency on a particular HTML structure. Components on the page can’t be easily moved around" - [Jonathan Snook](https://twitter.com/snookca)

Minimize "depth of applicability" in order to avoid over-reliance on a predefined HTML structure and hindering modularity and flexibility of components. This also helps to prevent introducing potential specificity issues which are notoriously difficult to debug. When selectors are kept succinct, it also becomes easier to convert components into templates for dynamic content [[1]](addendum.md).

### Guidelines for Minimal Specificity

  * Do not use CSS ID selectors.
  * Do not use location based selectors to change a component's appearance based on its page position or region - i.e. (main-content, side-bar, footer, etc)[[17]](addendum.md). When a component has different appearances create a new component by changing out its structure or skin class.
  * Always name-space state class names e.g. `.is-disabled` or `.is-collapsed` with a prefix.
  * Avoid the use of element selectors in order to keep them free from context and un-coupled to the HTML. Scope HTML element selectors with a class on the root element or a parent element so that these styles are opt-in rather than opt-out. This will avoid redundant overrides of un-needed styles and keep specificity minimal. [[1]](addendum.md) [[27]](addendum.md) [[28]](addendum.md)
  * `!important` should be avoided as much as possible. State and utility styles are an examples of an acceptable use of `!important` [[1]](addendum.md). The reason for this is that they are applied to the element and must override any default component styles.
  * Never qualify a selector with an element selector e.g. `ul.nav`, as this decreases selector performance, creates a context dependency, and increases the selector's specificity. These are all things to be avoided [[1]](addendum.md) [[12]](addendum.md). Applying styles directly to the element, or qualifying a slector with an element name should be considered as harmful as polluting the global name space in JavaScript. Don't do it.

## General Guiding Principles for Front-End Design

Archetype abstracts document semantics, presentation, and behavior in order to achieve a level of modularity that allows the modification of its components without impact on the overall system.


  * A code base must be maintainable, it must be readable, and it must be designed for modularity.
  * Front-end design principles must be clearly articulated so that the focus can be applied towards achieving project goals within this context. 
  * Design principles are defined as user versus developer driven so that if they ever come into conflict, the user centric goals are persevered [[22]](addendum.md).
  * Naming conventions are extremely important and must be clearly defined and strictly adhered to. This facilitates easy use of grep and more meaningful diffs.
  * All code in any code-base should appear as if the same person wrote it by remaining consistent in the application of coding standards.
  * Above all else, a site must be highly performant, widely accessibly, and device agnostic. The achievement of these goals necessitates the understanding that a site likely will not appear exactly the same on all browsers and devices.
  *  Adhere to standards as they are defined by the language specification
  *  Polyfil only essential features and avoid including additional library code whenever possible. Performance *IS* user experience. 
  * Minimize coupling between components by following Object Oriented methodologies
  * Design systems not pages by building a collection of components and layouts, which can be assembled together to create a specific experience.  Avoid page-specific styling in favor of component modifiers and class extensions.
  * Easily maintain the project's design system by following style guide driven development [[20]](addendum.md) that is made with HTML and CSS, uses production code, and uses git for version control [[21]](addendum.md). A project's style guide should also be automatically updated to reflect changes in the code base and facilitate testing throughout the project development cycle.
  * Documentation - Style Guide / Coding Standard

### Object Oriented Principles
Archetype is built on the OOCSS concepts of seperation of seperation of skin from structure and also the seperation of container and content. There are additional object oriented principles that are helpful to consider when builing custom modules.

  * **Single Responsibility Principle** - An object or component should have only a single responsibility, and that responsibility should be entirely encapsulated by the object/component [[7]](addendum.md) [[8]](addendum.md). Avoid coupling skin, structure, and layout within a single rule (i.e. box-model styles should never be applied along with background or text color within in the same ruleset).
  * **Extension over Modification** - Never directly edit the base styles (the object) of a component, unless you are certain you wish for this change to apply globally to all components that extend it. Use an additional class applied to the same instance of the base component to extend or overwrite the base component.  Extensions should not radically alter the end user’s expectation of an object’s functionality.
  * **Open/Closed Principle** - Entities (classes, modules, functions, etc.) are open for extension, but closed for modification. Base rules may be extended, but not directly modifiable. This is why directly styling HTML tags is not acceptable - reduce the amount of global element styles in order to reduce the chances of breaking the open/closed principle [[7]](addendum.md) [[9]](addendum.md). Opt-in, never opt-out, in order to avoid redundant overrides and code bloat.
  * **Composition over Inheritance** - Whenever possible, abstract specific functionality into isolation to be used to compose complete UI components.  Whenever similar code is being written more than once, look to abstract (i.e. vertical-spacing).  Standardizing similar styles cuts down on excess code and needless and/or inadvertent divergent implementation of similar patterns. Composition takes place in the HTML applying classes directly to the elements you wish to style.
  * **Liskov Substitution Principle** - Object extensions should be replaceable with other extensions of the same object without breaking. For example, applying a different component skin or structure to a base object must not affect the object itself.
  * **Entity Segregation Principle** - It is sometimes better to have multiple base objects opposed to a single generic object with multiple sub-objects. Never make sacrifices in functionality in the name of utility. Taken too far, code abstraction becomes  detrimental [[7]](addendum.md). When writing modular CSS, it's not about maintaining modularity in the actual code, but rather modularity in the actual design system [[10]](addendum.md).
  * **Minimize Coupling** - Build multiple, specific objects, rather than overly generic ones.  This helps to avoid tight coupling between unrelated modules, making it easier to make changes without inadvertently affecting other modules.  Avoid abstractions that attempt to do too much.  Smaller, more specific abstractions are preferred. Never couple styles to particular DOM elements or to a particular DOM structure. Never assume specific node children. (i.e. use a `.nav-item` class on each child rather than a `.nav & li a` selector chain).
  * **Encapsulation** - The UI of complex applications becomes needlessly brittle when components are not built independent of one-another.  Never write UI code that reaches into ancestral and/or sibling context.  Never write UI code that leaks styles downstream into nested components.  A component should never rely on the existence or appearance of descendant components, as long as they don’t break the layout of the parent component.
  * **DRY** - Reduce repetition when ever possible. Every piece of knowledge must have a single, un-ambiguous, and authoritative representation within the system.
  * **Documentation** - Heavily document components describing how it should be used, why specific CSS properties are needed, and the recommended markup pattern.  Any browser specific hacks should documented particularly well.


# Style Guide Driven Development

Styleguide Driven Development (SDD) is a practice that encourages the separation of UX, Design & Frontend from Backend concerns. This is achieved by developing the UI separately in a styleguide [[32]](addendum.md).

By separating the UI and backend tasks so they don’t rely on each other, it allows teams to iterate fast on prototypes and designs without having to make changes to the backend. With careful planning they should plug-and-play together nicely [[32]](addendum.md).

## Scenario Visualisation

User interfaces are often developed for best case scenarios, however they can unknowingly break in a handful of cases when a possible scenario hasn’t been considered or is ‘out of sight, out of mind’. Simple things like the length of the data or how it responds to mobile breakpoints can turn an otherwise well designed UI into an amateurish mess.

Having a styleguide that documents all the possible scenarios for a view is a tremendously powerful asset. It directly benefits each team member’s role as well as other members of the business. Historically, testing a view across all of its various states was very manual process and occasionally required database manipulation.

By documenting all scenarios in a central location the styleguide essentially becomes a frontend spec and helps identify edge-cases, gaps in the UX and breakages.

---
[[33]](addendum.md)

Anyone who has attempted to maintain a UI Style Guide over a long period of time will attest that it is a very difficult process. They are generally prioritised below the maintenance of your applications themselves and as such are likely the first candidates to fall behind and the last to be brought out of tech debt [[33]](addendum.md).

This is bad because once your Style Guide falls out of sync with your application(s) it has entirely lost its purpose. It is no longer a trustworthy representation of the state of your UI and will quickly fall out of favour with the design and development team [[33]](addendum.md).

A living style guide system autogenerate Style Guides when changes are made to the codebase so in theory they shouldn’t be able to fall behind. There are a whole host to choose from and many can be set up with fairly minimal effort.

[[20]](addendum.md)

**component api**
They autogenerate Style Guides when changes are made to the codebase so in theory they shouldn’t be able to fall behind. There are a whole host to choose from and many can be set up with fairly minimal effort.

The goals and benefits of a Style Guide were exactly what we wanted but, not knowing how to achieve them, we started by extracting as much of our UI into components and moving them outside of the applications. This also gave us the opportunity to normalise and condense our UI. Once done, we created a very simple API in which to fetch them from the Component Layer. Having the api for us was crucial because we wanted to maintain the mapping between the latest version of the the component and the application, and not have developers copy and paste component code.

Having a single version of the component, accessible via an API, worked perfectly with unit testing too so we could ensure that the contract between the API parameters and the returned template was solid. We could modify and extend the component based on the data we passed it and assert on the returned result. This also allowed us to add accessibility helpers and microformat attributes as standard and ensure that they weren’t forgotten when used in new applications.

It’s always up to date with the rest of lonelyplanet.com because it uses the exact same templates and CSS. As we’re not just performing static analysis of the CSS we are also able to showcase components that require JS too. It becomes a risk free environment where developers can build and tweak components and then allow them to propagate out to the rest of the applications.


