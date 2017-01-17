# Static Site Generator

## What this is

This is a small boilerplate for creating static sites for prototypes/proof of concepts for new projects while allowing the site to be built in a dynamic way.


## What this isn't

In its current form, this solution isn't suitable for production ready sites. There is no minification or linting of CSS/JavaScript and there has been no performance testing of building a large set of partials and data into a static site.


## Dependancies

* [Node](https://nodejs.org/en/).
* [Yarn](https://yarnpkg.com/).
* Gulp CLI: `npm install --global gulp-cli`.


## Getting started

* `yarn install` to get development dependencies.
* `npm start` or `gulp` to build the site, start a server and watch for changes.
* Go to [localhost:3000](http://localhost:3000) to view/debug.
* Changes to the source will automatically refresh in the browser.


## Features

All example source files are commented.

* **Views:** All HTML is in `src/views` and uses [Handlebars](http://handlebarsjs.com/). Handlebars allows the use of partials and can have data passed to the templates from `gulpfile.js`.

* **Styles:** All CSS is written in SASS in `src/sass` and includes an [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) folder structure; Autoprefixer, to automatically add vendor prefixes to relevant CSS properties; Sourcemaps, to indicate in which SASS partial a particular line of CSS appears when inspecting an element in the browser; SASS Lint to ensure all code meets particular standards.  Note: You'll need your own `.sass-lint.yml` to enforce your rules.

* **JavaScript:** All JS is written in modules in `src/js` and bundled using [Browserify](http://browserify.org/). This also allows the use of the Common JS pattern so packages obtained from npm can be directly required. Also includes ES Lint to ensure all code meets particular standards. Note: You'll need your own `.eslintrc` to enforce your rules.

* **Images:** All images should be placed in `src/img`. These are then copied to the `dist` folder. Note: There is no task to optimise images.


## Deployment

* Only the content of the `dist` folder needs to be deployed to a server or shared.
* This solution only uses a server for debugging to enable development features.
* Features that require a server to work (Cookies, AJAX) will not work as expected when served as a static site.
