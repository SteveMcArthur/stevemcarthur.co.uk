const fs = require('fs');
const path = require("path");
const utils = require("./utils");
const ut = require("util");
const HeadBuilder = require("./headBuilder");
const shareURLs = require("./shareURLs");


const templateFolder = path.join(__dirname, "templates");

const headTpl = fs.readFileSync(path.join(templateFolder, "head.html"), "utf-8");
const cookieConsentTpl = fs.readFileSync(path.join(templateFolder, "cookie-consent.html"), "utf-8");


let defaultOptions = {};
let metaTree = {};

function getStyles(page) {
    let styles = defaultOptions.dev && defaultOptions.devStyles ? defaultOptions.devStyles : defaultOptions.styles;
    styles = Array.isArray(page.styles) ? styles.concat(page.styles) : typeof styles == "string" ? styles.push(styles) : styles;
    return styles;
}

//executes in the page context
function getHead() {
    let metaData = {};
    metaData.title = this.pageTitle || this.title || this.site.title;
    metaData.headline = this.title;
    metaData.description = this.description;
    if(!metaData.description){
       if(defaultOptions.preferSiteDesc && this.site.description){
            metaData.description = this.site.description;
       }else {
            metaData.description = this.contents ? utils.getDescription(this.contents) : this.site.description;
       }
       
    }
        
    metaData.image = this.image || defaultOptions.image;
    metaData.author = this.author || defaultOptions.defaultAuthor || this.site.author;
    metaData.keywords = this.keywords || this.tags || this.site.keywords;
    metaData.siteURL = defaultOptions.siteURL;
    metaData.path = "/" + this.path;
    metaData.url = this.url;
    metaData.type = this.type || "website";
    metaData.logo = this.logo || this.site.logo;
    metaData.logoWidth = this.logoWidth || this.site.logoWidth;
    metaData.logoHeight = this.logoHeight || this.site.logoHeight;
    metaData.organization = this.organization || this.site.organization || defaultOptions.organization;
    if(this.imglist && this.imglist.length > 2){
        metaData.imglist = this.imglist;
        img = this.imglist;
        q = '"';
        url = this.site.url;
        fullurl = utils.tryFullURL;
        metaData.imgliststr = q+fullurl(url,img[0][0])+q+",\n\t\t"+q+fullurl(url,img[1][0])+q+",\n\t\t"+q+fullurl(url,img[2][0])+q;
    }

    if(this.price){
        metaData.price = this.price;
        metaData.currency = this.currency || this.site.currency;
    }
    metaData.themeColor = this.themeColor || defaultOptions.themeColor || "#fff";
    metaData.gaID = defaultOptions.disableAnalytics ? "" : (this.gaID || this.site.gaID || this.gaId || this.site.gaId || "");
    metaData.styles = getStyles(this);
    metaData.criticalCSS = defaultOptions.criticalCSS;
    if (defaultOptions.cookieConsent) {
        metaData.cookieConsent = cookieConsentTpl;
    }
    metaData.structuredData = this.structuredData;

    const headBuilder = new HeadBuilder(headTpl);

    return headBuilder.getHead(metaData);
}

function assignOptions(opts, metadata) {
    metaTree = {};
    site = metadata.site || {};
    defaultOptions = opts;
    defaultOptions.html5shim = defaultOptions.html5shim || true;
    defaultOptions.siteURL = defaultOptions.siteURL || site.url || metadata.url;
    defaultOptions.siteName = defaultOptions.siteName || site.title || metadata.siteName;
    defaultOptions.image = defaultOptions.image || metadata.defaultImage || metadata.image || site.defaultImage || site.image;
    shareURLs.assignDefaultOptions(defaultOptions)
}

function getCookieConsent() {
    return cookieConsentTpl;
}


function getMetaTree() {
    return metaTree;
}

var defaultImg = "";
var defaultAuthor = "";
var extReg = /\.[^/.]+$/;
function setImageAndAlt(fileObject) {
    //normalise image name
    var img = fileObject.img || fileObject.image || fileObject.imageright || fileObject.imageleft || defaultImg;
    fileObject.image = img;
    //calculate alt tag from file name if it hasn't been set manually
    if (!fileObject.alt) {
        //extract just the filename
        var altArr = img.split("/");
        var alt = "";
        if (altArr.length > 0) {
            alt = altArr[altArr.length - 1];
            //remove extension and replace dashes with spaces
            alt = alt.replace(extReg, "").replace(/-/g, " ");
            //capatalize first lettser
            alt = alt.charAt(0).toUpperCase() + alt.slice(1);
        }
        fileObject.alt = alt;
    }

}

module.exports.getHead = getHead;
module.exports.assignOptions = assignOptions;
module.exports.setImageAndAlt = setImageAndAlt;
module.exports.getShareURLs = shareURLs.getShareURLs;
module.exports.getMetaTree = getMetaTree;
module.exports.getCookieConsent = getCookieConsent;