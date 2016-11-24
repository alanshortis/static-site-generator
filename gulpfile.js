'use strict';

const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      browserify = require('browserify'),
      buffer = require('vinyl-buffer'),
      connect = require('gulp-connect'),
      del = require('del'),
      handlebars = require('handlebars'),
      gulpHandlebars = require('gulp-handlebars-html')(handlebars),
      imagemin = require('gulp-imagemin'),
      notifier = require('node-notifier'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      source = require('vinyl-source-stream'),
      sourcemaps = require('gulp-sourcemaps');


// File paths.
const paths = {
  src: {
    html: 'src/views',
    sass: 'src/sass',
    js: 'src/js',
    img: 'src/img'
  },
  dist : {
    dist: './dist',
    html: 'dist',
    css: 'dist/css',
    js: 'dist/js',
    img: 'dist/img',
    partials: 'src/views/partials'
  }
};


// Start a server.
gulp.task('connect', () => {
  connect.server({
    port: 3000,
    root: paths.dist.dist,
    livereload: true,
    fallback: `${paths.dist.dist}/404.html`
  });
});


// Build CSS from SASS with sourcemaps and autoprefix.
gulp.task('css', () => {
  return gulp.src(`${paths.src.sass}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded', precision: 3})
    .on('error', (err) => {
      sass.logError.call(this, err);
      notifier.notify({
        title: 'Gulp',
        message: 'SASS error - see terminal for details.'
      });
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(connect.reload());
});


// Build our JS modules.
gulp.task('js', () => {
  return browserify({entries: `${paths.src.js}/app.js`, extensions: ['.js'], debug: true})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.dist.js}`))
    .pipe(connect.reload());
});


// Optimise images and put them in the dist folder.
gulp.task('images', () => {
  return gulp.src(`${paths.src.img}/**/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${paths.dist.img}`))
    .pipe(connect.reload());
});


// Build handlebars templates.
gulp.task('html', () => {

  // If you need to pass data to the view, put it in this object.
  const templateData = {
    name: 'Del Trotter',
    company: 'Trotters Independent Traders'
  };

  const options = {
    partialsDirectory: [`${paths.src.html}/partials`],
    allowedExtensions: ['hbs', 'html', 'svg']
  };

  return gulp.src([`${paths.src.html}/**/*{hbs, html}`, `!${paths.src.html}/partials/**/*{hbs, html}`])
    .pipe(gulpHandlebars(templateData, options))
    .pipe(rename((path) => {
      path.extname = '.html';
    }))
    .pipe(gulp.dest(paths.dist.dist))
    .pipe(connect.reload());
});


// Delete all generated files.
gulp.task('clean', () => {
  return del.sync([paths.dist.dist, `${paths.dist.partials}/icons.svg`]);
});


// Watch for changes.
gulp.task('watch', () => {
  gulp.watch(`${paths.src.html}/**/*.hbs`, ['html']);
  gulp.watch(`${paths.src.sass}/**/*.scss`, ['css']);
  gulp.watch(`${paths.src.js}/**/*.js`, ['js']);
  gulp.watch(`${paths.src.img}/**/*`, ['images']);
});


// Run it all.
gulp.task('default', ['clean', 'html', 'images', 'js', 'css', 'connect', 'watch']);
