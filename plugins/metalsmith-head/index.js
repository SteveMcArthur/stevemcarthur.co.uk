
const utils = require("./lib/utils");
const getSocialURLs = require("./lib/getSocialURLs");
const url = require("url");

let defaultImg = "";
const extReg = /\.[^/.]+$/;
function setImageAndAlt(fobj) {
    //normalise image name
    const img = fobj.img || fobj.image || fobj.imageright || fobj.imageleft || defaultImg;
    fobj.image = img;
   
    //calculate alt tag from file name if it hasn't been set manually
    if (fobj.image && !fobj.alt) {
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
        fobj.alt = alt;
    }

}

/**
 * Metalsmith add seo metadata to each file.
 *
 * @return {Function}
 */
function plugin(opts) {
    defaultImg = opts.defaultImg;
    return function (files, metalsmith, done) {
        console.log("head start...");
        setImmediate(done);
        let metadata = metalsmith.metadata();
        metadata.criticalCSS = opts.criticalCSS;
        metadata.styles = opts.dev ? opts.devStyles : opts.styles;
        metadata.cookieConsent = metadata.cookieConsent || opts.cookieConsent || false;
        metadata.getExcerpt = utils.getExcerpt;
        metadata.tryFullURL = utils.tryFullURL;
        metadata.getSocialURLs = getSocialURLs;

        metadata.favicon = metadata.favicon || "/favicon.ico";
        metadata.themeColor = metadata.themeColor || "#fff";

        const twLengths = metadata.twLengths || opts.twLengths || {title: 70,  description: 200 };
        const ogLengths = metadata.ogLengths || opts.ogLengths || { title: 90, description: 200}; 

        const homeUrl = metadata.site.url;
        Object.keys(files).forEach(function (file) {
            let fobj = files[file];
            fobj.description = fobj.description || (fobj.contents ? utils.getDescription(fobj.contents) : fobj.site.description);
            if(fobj.description && !fobj.twitter_desc){
                fobj.twitter_desc = utils.getTruncatedChars(fobj.description, twLengths.description);
            }
            if(fobj.title && !fobj.twitter_title){
                fobj.twitter_title = utils.getTruncatedChars(fobj.title, twLengths.title);
            }
            if(fobj.description && !fobj.og_desc){
                fobj.og_desc = utils.getTruncatedChars(fobj.description,ogLengths.description);
            }
            if(fobj.title && !fobj.og_title){
                fobj.og_title = utils.getTruncatedChars(fobj.title,ogLengths.title);
            }
            setImageAndAlt(fobj);
            if(fobj.image){
                fobj.fullimage = utils.tryFullURL(homeUrl,fobj.image);
            }
            fobj.author = fobj.author || opts.defaultAuthor || metadata.site.author;
            fobj.type = fobj.type || "website";
            //fix for windows. Has to be done after permalinks plugin
            fobj.path = fobj.path.replace(/\\/g, "/");
            fobj.url = url.resolve(homeUrl, fobj.path);
            if (!fobj.slug) {
                const sections = fobj.path.split(/\//);
                const slug = sections[sections.length - 1];
                fobj.slug = slug;
            }
            //convert array imglist to string
            //used for strutured data
            if(fobj.imglist && fobj.imglist.length > 2){
                let img = fobj.imglist;
                q = '"';
                fullurl = utils.tryFullURL;
                metadata.imgliststr = q+fullurl(homeUrl,img[0][0])+q+",\n\t\t"+q+fullurl(homeUrl,img[1][0])+q+",\n\t\t"+q+fullurl(homeUrl,img[2][0])+q;
            }

            if(fobj.price){
                fobj.currency = fobj.currency || metadata.currency || metadata.site.currency;
            }

        });
        console.log("head finished...");
    };
}

module.exports = plugin;