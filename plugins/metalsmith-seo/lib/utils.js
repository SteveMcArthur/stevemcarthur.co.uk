const url = require("url");
const truncateHTML = require("truncate-html");

module.exports.tryFullURL = function(siteURL, relativeURL) {
    //if there is no relativeURL then we are on the home page - so the siteURL will be the full url
    //return relativeURL ? (siteURL ? url.resolve(siteURL, relativeURL) : relativeURL) : "";
    relativeURL = relativeURL || "";
    return siteURL ? url.resolve(siteURL, relativeURL) : relativeURL;
}
module.exports.getTruncatedChars = function(contents, numChars) {
    numChars = numChars || 30;
    return truncateHTML(contents, numChars, { byWords: false });
}

module.exports.getExcerpt = function(contents, numWords) {
    numWords = numWords || 50;
    return truncateHTML(contents, numWords, { byWords: true });
}

module.exports.getDescription = function(contents, numChars) {
    numChars = numChars || 160;
    const description = truncateHTML(contents, numChars, { byWords: false, stripTags: true });
    return description;
}


