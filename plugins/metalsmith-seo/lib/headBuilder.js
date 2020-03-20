
const Handlebars = require("handlebars");
const utils = require("./utils");
const fs = require("fs");
const path = require("path");
const sdArticleTpl =  fs.readFileSync(path.join(__dirname,"/templates/JSON-LD-article.html"),"utf-8");


function HeadBuilder(tpl){
    this.template = Handlebars.compile(tpl);
    this.sdArticle = Handlebars.compile(sdArticleTpl);
    this.twLengths = {
        title: 70,
        description: 200
    }
    this.ogLengths = {
        title: 90,
        description: 200
    };     
}


HeadBuilder.prototype.getHead = function(metaData){
    if(!metaData.title){
        console.error("No title passed to HTML head");
    }
    if(!metaData.description){
        console.error("No description passed to HTML head");
    }
    if(!metaData.siteURL){
        console.error("No siteURL passed to HTML head");
    }
    if(metaData.image){
        metaData.image = utils.tryFullURL(metaData.siteURL, metaData.image);
    }
    if(metaData.url){
        metaData.url = utils.tryFullURL(metaData.siteURL, metaData.url);
    }
    if(metaData.logo){
        metaData.logo = utils.tryFullURL(metaData.siteURL, metaData.logo);
    }
    metaData.favicon = metaData.favicon || "/favicon.ico";
    metaData.themeColor = metaData.themeColor || "#fff";
    metaData.twitter = {};
    metaData.og = {};
    //set title and description lengths
    metaData.twitter.description = utils.getTruncatedChars(metaData.description, this.twLengths.description);
    metaData.twitter.title = utils.getTruncatedChars(metaData.title, this.twLengths.title);
    metaData.og.description = utils.getTruncatedChars(metaData.description, this.ogLengths.description);
    metaData.og.title = utils.getTruncatedChars(metaData.title, this.ogLengths.title);
    if(metaData.structuredData){
        metaData.structuredData = this.sdArticle(metaData);
    }
    return this.template(metaData)

}

module.exports = HeadBuilder;