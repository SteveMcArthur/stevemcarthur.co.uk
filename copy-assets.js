const gulp = require("gulp");
var path = require("path");


let buildDir = "../build";

function copyAssets() {
    let dest = path.resolve(__dirname, buildDir);
    console.log("copy assets to " + dest);
    gulp.src(['assets/**/*'], {
        base: 'assets'
    }).pipe(gulp.dest(dest));
    console.log("assets copied...");
}

copyAssets();