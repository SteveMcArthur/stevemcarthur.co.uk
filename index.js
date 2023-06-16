var metalsmith = require("metalsmith");
var watch = require("metalsmith-watch");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var partial = require("metalsmith-partial");
var permalinks = require("metalsmith-permalinks");
var collections = require("metalsmith-collections");
var pageTitles = require("metalsmith-page-titles");
var sitemap = require("metalsmith-sitemap");
var drafts = require('metalsmith-drafts');
var msMoment = require("metalsmith-moment");
var seo = require("./plugins/metalsmith-head");
const gulp = require("gulp");
var path = require("path");
var fs = require("fs");
var util = require("util");

const meta = require("./metadata.js");

function donothing(options) {
    return function (files, metalsmith, done) {
        setImmediate(done);
        console.log("do nothing...");
    }
}
let TESTCONFIG = false;
let buildDir = "../build";

if (TESTCONFIG) {
    console.log("Test Config running");
    meta.disableAnalytics = true;
    meta.dev = true;
    buildDir = "../build-test";
    console.log("anaytics disabled");
} else {
    console.log("Live Config running");
    meta.disableAnalytics = false;
    meta.dev = false;
    console.log("anaytics Active");
}

function copyAssets() {
    let dest = path.resolve(__dirname, buildDir);
    console.log("copy assets to " + dest);
    gulp.src(['assets/**/*']).pipe(gulp.dest(dest));
    console.log("assets copied...");
}


metalsmith(__dirname)
    .metadata(meta)
    .use(pageTitles())
    .source("./src")
    .destination(buildDir)
    .use(collections({
        articles: {
            pattern: 'blog/post/*.md',
            sortBy: "date",
            reverse: true
        },
        services: {
            pattern: 'services/*.md',
            sortBy: "date",
            reverse: true
        },
        portfolio: {
            pattern: 'portfolio/*.md',
            sortBy: "date",
            reverse: true
        },
        rootPages: {
            pattern: '*.md',
            sortBy: "date",
            reverse: true
        }

    }))
    .clean(true)
    .use(msMoment(["date"]))
    .use(drafts())
    .use(markdown())
    .use(permalinks({
        relative: false
    }))
    .use(seo({
        defaultAuthor: "Steve McArthur",
        defaultImage: "/img/code-header.jpg",
        cookieConsent: true,
        icons: true,
        themeColor: "#000"
    }))
    .use(partial({
        directory: "./partials",
        engine: "ect"
    }))
    .use(layouts({
        engine: "ect",
        root: "./layouts"
    }))
    .use(
        sitemap({
            hostname: "https://www.stevemcarthur.co.uk",
            omitIndex: true
        })
    )
    .use(
        watch({
            paths: {
                "layouts/**/*": "**/*",
                "partials/**/*": "**/*",
                "src/*.md": true,
                "src/*.html": true,
                "src/css/**/*": true,
                "src/js/**/*": true,
                "src/blog/**/*": true,
                "src/portfolio/**/*": true,
                "src/img/**/*": true
            },
            livereload: false
        })
    )
    .build(function (err) {
        if (err) {
            throw err;
        }
        console.log("Build completed without error...");
        copyAssets();
    });