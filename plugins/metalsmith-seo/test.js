var htmlHead = require("./htmlHead");

var opts = {
    title: "My Title",
    description: "To be or not to be",
    image: "http://website.com/images/image.jpg",
    alt: "image",
    url: "http://website.com/",
    styles: [
        "https://fonts.googleapis.com/css?family=Poppins:900|Roboto:300,400,400i,500,700,900",
        "/css/bootstrap.css",
        "/css/ie10-viewport-bug-workaround.css"
    ]
}
console.log(htmlHead(opts));
