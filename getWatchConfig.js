function getWatchConfig(names) {
    const config = {
        base: {
            "partials/html-head.ect": "**/*",
            "layouts/layout.ect": "**/*",
            "partials/navs/*": "**/*",
            "partials/sidebar/*": "**/*",
            "partials/hero/*": "**/*",
            "partials/footer.ect": "**/*",
            "partials/newsletter.ect": "**/*",
            "partials/header-cart/*": "**/*",
            "src/ws839/*.*" : true
        },
        home: {
            "layouts/index.ect": "index.md",
            "partials/carousel/*": "**/*",               
            "partials/home/*": "index.md"
        },
        sections: {
            "partials/subscribe/*": "**/*",
            "partials/sections/*": "index.md"
        },
        shop: {
            "src/shop/**/*": true,
            "layouts/product.ect": "shop/**/*",
            "layouts/products.ect": "**/*",
            "partials/product-tabs.ect": "**/*",
            "partials/product-item.ect": "**/*",
            "partials/purchase-form.ect": "shop/**/*",
            "partials/product-share.ect": "shop/**/*",
            "partials/cart-item.ect": "cart.md"
        },
        blog: {
            "layouts/post.ect": "blog/*",
            "src/blog/**/*": true
        },

        thankyou: {
            "layouts/thankyouphp.ect": "thank-you.md",
            "partials/paypal_pdt_php.php": "thank-you.md"
        },
        pages: {
            "layouts/page.ect": "**/*",
            "layouts/page-nosidebar.ect": "**/*",
            "layouts/page-nosidebar2.ect": "**/*",
            "layouts/contact.ect": "contact.md",
            "layouts/checkout.ect": "checkout.md",
            "layouts/cart.ect": "cart.md",
            "layouts/fusions.ect": "cbd-fusions.md"
        }
    };
    let output = {};
    if(names == "all"){
        names = Object.keys(config);
    }
    names.forEach(name => {
        let obj = config[name];
        if (obj) {
            Object.assign(output,obj);
        }
    });
    return output;

}
module.exports = getWatchConfig;