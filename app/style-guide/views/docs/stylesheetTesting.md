# Stylesheet Testing

  * Tests are just a "change" notification
  * Must be automated
  * Goal: identify if the change was what was expected and if the change took place where it was expected. We want to ensure that new code introduced to the system doesn't inadvertantly effect.


# Tooling

  * [PhantomCSS](https://github.com/Huddle/PhantomCSS) - built on top of CasperJS and PhantomJS creates screen shots at any screen size, compares them to a previous run and outputs a visual diff of the two images.
  * [Hardy](http://hardy.io/) - automated CSS testing using [Selenium](http://docs.seleniumhq.org/) and [Cucumber](http://cukes.info/) to run computed style checks.

wish list:
  * a way to pass variables from Sass to Hardy??
      * see: http://css-tricks.com/making-sass-talk-to-javascript-with-json/
      * see: http://hugogiraudel.com/2014/01/20/json-in-sass/ 
  * a way to automate the comparison of diff acceptance...looks like there's conventions for this built into PhantomCSS, also see: [cssCritic](http://cburgmer.github.io/csscritic/)


## [Archetype Visual Unit Tests](/tests.html)

5. Testable
    * Test for coding standard compliance
    * Test for visual regression (unit level)
    * Test for redundancies