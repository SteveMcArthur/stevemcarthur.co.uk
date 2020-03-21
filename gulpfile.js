//let buildDir =  "../build-test";
let buildDir =  "../build";

function defaultTask(cb) {
    const gulp = require('gulp');
    const watch = gulp.watch;
    const pathUtil = require("path");
    const destDir = pathUtil.resolve(__dirname, buildDir);
    const assetDir = pathUtil.resolve(__dirname,"assets");
    console.log(destDir);
    console.log(assetDir);
    console.log("copy js & css assets..");
    gulp.src(['assets/js/**/*', 'assets/css/**/*'], {
        base: 'assets'
    }).pipe(gulp.dest(destDir, { overwrite: true }));

    const watcher = watch(['assets/**/*'], { awaitWriteFinish: true });
    console.log("default task...");
    watcher.on('change', function (path, stats) {
        console.log(`File ${path} was changed`);
        let source = pathUtil.dirname(path);
        let outpath = path.replace(/^assets/,"");
        console.log(outpath);
        outpath = destDir + outpath;
        
        console.log("Copying to: " + outpath);
        let dest = pathUtil.dirname(outpath);
        //gulp dest expects a directory name not a path to a file
        gulp.src(path, { base: source })
            .pipe(gulp.dest(dest, { overwrite: true }))
    });

    watcher.on('add', function (path, stats) {
        console.log(`File ${path} was added`);
        let source = pathUtil.dirname(path);
        let outpath = path.replace(/^assets/,"");
        console.log(outpath);
        outpath = destDir + outpath;
        
        console.log("Copying to: " + outpath);
        let dest = pathUtil.dirname(outpath);
        //gulp dest expects a directory name not a path to a file
        gulp.src(path, { base: source })
            .pipe(gulp.dest(dest, { overwrite: true }))
    });

    /*     watcher.on('unlink', function(path, stats) {
          console.log(`File ${path} was removed`);
          let outpath = path.replace("assets\\","build\\");
          console.log("Delete: "+outpath);
          del.sync(outpath);
        }); */
    if (cb) cb();
}

//defaultTask();


exports.default = defaultTask