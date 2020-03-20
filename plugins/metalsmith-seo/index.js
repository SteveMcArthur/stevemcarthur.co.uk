
const htmlHead = require("./lib/htmlHead");
const url = require("url");
const utils = require("./lib/utils");

const defaultImg = "";
const extReg = /\.[^/.]+$/;
function setImageAndAlt(fileObject) {
    //normalise image name
    const img = fileObject.img || fileObject.image || fileObject.imageright || fileObject.imageleft || defaultImg;
    fileObject.image = img;
    //calculate alt tag from file name if it hasn't been set manually
    if (!fileObject.alt) {
        //extract just the filename
        const altArr = img.split("/");
        let alt = "";
        if (altArr.length > 0) {
            alt = altArr[altArr.length - 1];
            //remove extension and replace dashes with spaces
            alt = alt.replace(extReg, "").replace(/-/g, " ");
            //capatalize first letters
            alt = alt.charAt(0).toUpperCase() + alt.slice(1);
        }
        fileObject.alt = alt;
    }

}



function plugin(options) {
    options = options || {};
    const defaultImg = options.defaultImg || "";
    const defaultAuthor = options.defaultAuthor || "";

    return function (files, metalsmith, done) {

        const meta = metalsmith.metadata();
        htmlHead.assignOptions(options,metalsmith.metadata());
        meta.htmlHead = htmlHead.getHead;
        //urls for share buttons
        meta.getShareURLs = htmlHead.getShareURLs;
        meta.getMetaTree = htmlHead.getMetaTree;
        //useful for outputing blog excerpts
        meta.getExcerpt = utils.getExcerpt;
        meta.getCookieConsent = htmlHead.getCookieConsent;
        const homeUrl = meta.site.url;
        Object.keys(files).forEach(function (file) {
            let fileObject = files[file];
            if (fileObject.layout || fileObject.title) {
                setImageAndAlt(fileObject);
                fileObject.author = fileObject.author || defaultAuthor;
                //fix for windows. Has to be done after permalinks plugin
                fileObject.path = fileObject.path.replace(/\\/g,"/"); 
                fileObject.url = url.resolve(homeUrl, fileObject.path);
                const sections = fileObject.path.split(/\//);
                const slug = sections[sections.length - 1];
                fileObject.slug = slug;
            };
        });
        done();

    }
}

module.exports = plugin;