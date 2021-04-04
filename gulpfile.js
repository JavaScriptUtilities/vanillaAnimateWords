/* ----------------------------------------------------------
  Vars
---------------------------------------------------------- */

const gulp = require('gulp');
const {
    series
} = gulp;
const minify = require("gulp-minify");

/* ----------------------------------------------------------
  Minify
---------------------------------------------------------- */

function minifyjs() {
    return gulp.src('js/*.js')
        .pipe(minify({
            noSource: true,
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['*.min.js']
        }))
        .pipe(gulp.dest('js'));
}

exports.minifyjs = minifyjs;

/* ----------------------------------------------------------
  Default tasks
---------------------------------------------------------- */

exports.default = series(minifyjs);
