# Getting Started


Using Dexy to build responsive design deliverables is incredibly efficient because you can display code snippets, or the actual rendered output to document HTML, CSS and Sass, and JavaScript. Because this documentation is automatically updated, building and maintaining living, breathing style guides and pattern libraries is simple after you get your design system setup.

### Moving parts

  * [Dexy](www.dexy.it) is an incredibly flexible documentation software built on Python that uses numerous filter plugins to allow for the use of live code examples to be output into any document you wish. Because everything is based on live code, updating documentation requires only a single command.
  * [Jinja](http://jinja.pocoo.org/) - The templating engine for Python which
    allows you to output you code any where you want using the appropriate
    filter.
  * [htmlsections](http://www.dexy.it/filters/Htmlsections.html) - Dexy's HTML
    filter that allows you to split markup according to HTML comments
  * [idio](http://www.dexy.it/filters/Idio.html) - Dexy filter to split
    document at comments that can be used with CSS, Sass, and JavaScript
  * [Pandoc](http://johnmacfarlane.net/pandoc/) - A very powerful markup 
    conversion utility that allows you to convert between markup language
    syntaxes.
  * [PhantomJS](http://phantomjs.org/) - a headless WebKit scriptable with
    a JavaScript API and [CasperJS](http://casperjs.org/) - a navigation
    scripting & testing utility written in JavaScript for PhantomJS. These two
    utilities allow for scriptable screen shots of components that can include
    both state (ie hover and active) and context (screen deminsion).


### Installing Dexy
See the [Dexy Documentation](http://dexy.it).

### Use
If you are brand new to [Dexy](www.dexy.it) I would highly recommend completing several of the [tutorials](http://www.dexy.it/guide/getting-started.html) and familiarizing your self with [Dexy's commands](http://www.dexy.it/guide/command-line-interface.html). Once you wrap your head around how Dexy's filter system works along with several of the other moving parts used in our specific use case, it becomes pretty strait forward.

Setup Dexy

```
$ Dexy setup
```

Run Dexy (optionally pass the -r flag which resets Dexy before running)

```
$ Dexy -r
```

Dexy will then run and if successful it will output your static site files into the `output-site` directory. If there were errors, Dexy will print those to the screen and also record them within the `log` directory.

Dexy also has a built in server that runs on Python and is configured to symlink your generated site files into your root directory.

To start a server run the following from your root directory

```
$ Dexy serve
```
Copy and paste the output URL into a browser to view your site files.




## Customize and Extend


