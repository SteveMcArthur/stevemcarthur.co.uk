const utils = require("./utils");
const twitterURL = "https://twitter.com/intent/tweet?text={description}&url={shareURL}";
const facebookURL = "https://www.facebook.com/sharer/sharer.php?u={shareURL}";
const googleURL = "https://plus.google.com/share?url={shareURL}";
const pinterestURL = "https://pinterest.com/pin/create/button/?url={shareURL}&media={image}";

defaultOptions = {};

function getShareURLs() {
    let description = this.description || utils.getDescription(this.contents);
    description = encodeURIComponent(description);
    let image = this.image || defaultOptions.image;
    image = utils.tryFullURL(defaultOptions.siteURL, image);
    image = encodeURIComponent(image);
    let shareURL = utils.tryFullURL(defaultOptions.siteURL, this.path);
    shareURL = encodeURIComponent(shareURL);

    return {
        twitterURL: twitterURL.replace("{description}", description).replace("{shareURL}", shareURL),
        facebookURL: facebookURL.replace("{shareURL}", shareURL),
        googleURL: googleURL.replace("{shareURL}", shareURL),
        pinterestURL: pinterestURL.replace("{shareURL}", shareURL).replace("{image}", image)
    }
}
module.exports.assignDefaultOptions = function(opts){
    defaultOptions = opts;
}
module.exports.getShareURLs = getShareURLs;