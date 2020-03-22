const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


let src = [
    "assets/js/prism/prism.js",
    "assets/js/prism/prism-javascript.js",
    "assets/js/prism/prism-json.js",
    "assets/js/prism/prism-visual-basic.js",
    "assets/js/prism/prism-markup.js",
    "assets/js/prism/prism-markup-templating.js",
    "assets/js/prism/prism-handlebars.js",
    "assets/js/prism/prism-coffeescript.js",
    "assets/js/prism/prism-csharp.js"
];



gulp.src(src)
    .pipe(concat("tempfile.js"))
    .pipe(uglify())
    .pipe(rename('prism-custom.min.js'))
    .pipe(gulp.dest('assets/js/', {
        overwrite: true
    }));