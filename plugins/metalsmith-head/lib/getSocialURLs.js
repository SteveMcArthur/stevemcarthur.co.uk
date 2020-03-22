function getSocialURLs() {
    const url = this.path ? this.site.url + this.path + "/" : this.site.url;
    let img = this.img || this.image || this.site.image;
    img = (this.site.url + img).replace("uk//", "uk/");
    const shareURL = encodeURIComponent(url);
    const shareTitle = encodeURIComponent(this.title || this.site.title);
    const shareDesc = encodeURIComponent(this.description || this.site.description);
    const shareImg = encodeURIComponent(img);
    const twitterURL = "https://twitter.com/intent/tweet?text=" + shareDesc + "&url=" + shareURL;
    const facebookURL = "https://www.facebook.com/sharer/sharer.php?u=" + shareURL;
    //const pinterestURL = "http://pinterest.com/pin/create/button/?url="+shareURL+"&description="+shareDesc;
    const pinterestURL = "https://pinterest.com/pin/create/bookmarklet/?media=" + shareImg + "&url=" + shareURL + "&description=" + shareTitle;
    const whatsappURL = "https://wa.me/?text=" + shareTitle + " " + shareURL;

    return {
        twitterURL,
        facebookURL,
        pinterestURL,
        whatsappURL
    }
};

module.exports = getSocialURLs;