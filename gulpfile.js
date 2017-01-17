const gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      browserify = require('browserify'),
      handlebars = require('handlebars'),
      gulpHandlebars = require('gulp-handlebars-html')(handlebars),
      notifier = require('node-notifier'),
      rename = require('gulp-rename'),
      del = require('del'),
      buffer = require('vinyl-buffer'),
      source = require('vinyl-source-stream'),
      browserSync = require('browser-sync').create();

const paths = {
  src: {
    html: 'src/views',
    partials: 'src/views/partials',
    sass: 'src/sass/**/*.scss',
    js: 'src/js',
    img: 'src/img'
  },
  dest : {
    dest: './dist',
    html: 'dist',
    css: 'dist/css',
    js: 'dist/js',
    img: 'dist/img',
    partials: 'src/views/partials'
  }
};


gulp.task('serve', ['clean', 'css', 'js', 'images', 'html'], () => {
  browserSync.init({
    server: {
      baseDir: paths.dest.dest,
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  });
  gulp.watch(paths.src.sass, ['css']);
  gulp.watch(`${paths.src.js}/**/*.js`, ['js']);
  gulp.watch(`${paths.src.img}/**/*`, ['images']);
  gulp.watch(`${paths.src.html}/**/*`, ['html']);
});


gulp.task('css', () => {
  return gulp.src(paths.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})
    .on('error', function(err) {
      sass.logError.call(this, err);
      notifier.notify({
        title: 'Gulp',
        message: 'SASS error'
      });
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.stream());
});


gulp.task('js', () => {
  return browserify({entries: `${paths.src.js}/app.js`, extensions: ['.js'], debug: true})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest.js))
    .pipe(browserSync.stream());
});


gulp.task('images', () => {
  return gulp.src(`${paths.src.img}/**/*`)
    .pipe(gulp.dest(`${paths.dest.img}`))
    .pipe(browserSync.stream());
});


gulp.task('html', () => {
  const templateData = {
    name: 'Del Trotter',
    company: 'Trotters Independent Traders'
  };

  const options = {
    partialsDirectory: paths.src.partials,
    allowedExtensions: ['hbs', 'html']
  };

  return gulp.src([`${paths.src.html}/**/*{hbs, html}`, `!${paths.src.partials}/**/*{hbs, html}`])
    .pipe(gulpHandlebars(templateData, options))
    .pipe(rename((path) => {
      path.extname = '.html';
    }))
    .pipe(gulp.dest(paths.dest.dest))
    .pipe(browserSync.stream());
});


gulp.task('clean', () => {
  return del.sync(paths.dest.dest);
});


gulp.task('default', ['serve']);
