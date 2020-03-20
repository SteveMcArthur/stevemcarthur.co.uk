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
var seo = require("./plugins/metalsmith-seo");
var fs = require("fs");
var util = require("util");


metalsmith(__dirname)
    .metadata({
        site: {
            title: "Steve McArthur",
            brand1: "Steve",
            brand2: "McArthur",
            subtitle: "Steve McArthur Developer",
            email: "contact@stevemcarthur.co.uk",
            tel: "",
            description: "Hi, my name is Steve. I create beautiful & functional websites for small businesses.",
            keywords: "Steve McArthur, Stephen McArthur, web developer, web designer",
            author: "Steve McArthur",
            generator: "Metalsmith",
            url: "https://www.stevemcarthur.co.uk",
            gaID: "UA-59463797-1",
            year: (new Date()).getFullYear(),
            navItems: {
                Home: "/",
                About: "/about",
                Blog: "/blog",
                Contact: "/contact"
            }
        }, 
        getArticle: function(field,value){
            var article = this.articles.find(function(item){
                return item[field] == value;
            });
            return article;
        },
        getRootPage: function(field,value){
            var page = this.rootPages.find(function(item){
                return item[field] == value;
            });
            return page;
        },
        getVisibleArticles: function(){
            var arr = this.articles.filter(function(item){
                return !item.hide;
            });
            return arr;
        },       
        writeObject: function(obj,name){
            name = name || "obj.json";
            name = "./json/"+name;
            fs.writeFileSync(name,util.inspect(obj,true,4),'utf-8');
        }
 
    })
    .use(pageTitles())
    .source("./src")
    .destination("../build")
    
    //this is a fix for metalsmith-collections
    //with metalsmith-watch to clear out the
    //collections when reloading
    .use(function (files, metalsmith, done) {
        metalsmith._metadata.collections = null;
        metalsmith._metadata.articles = null;
        metalsmith._metadata.services = null;
        metalsmith._metadata.portfolio = null;
        metalsmith._metadata.rootPages = null;
        done()
    })
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
    .clean(false)
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
        dev: false,
        styles: [
            "https://fonts.googleapis.com/css?family=Poppins:400,400i,500,600,700|Montserrat+Alternates:400,700",
            "/css/bootstrap.css", 
            "/css/styles.css",
            "/font-awesome/css/all.css",
            "/css/prism-vscode.css",
            "/css/vb.css",
            "/css/prism-headers.css"
        ],
        devStyles: [
            "https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,600,700|Montserrat+Alternates:400,700",
            "/css/bootstrap.css",
            "/css/base.css",
            "/css/typography.css",
            "/css/socials.css",
            "/css/navbar.css",
            "/css/header.css",
            "/css/page.css",
            "/css/footer.css",
            "/css/home.css",
            "/css/svg-overlays.css",
            "/css/post-img.css",
            "/css/post.css",
            "/css/svg-backgrounds.css",
            "/font-awesome/css/all.css",
            "/css/prism-vscode.css",
            "/css/vb.css",
            "/css/prism-headers.css"
        ]
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
    });