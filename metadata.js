const fs = require("fs-extra");
const util = require("util");
const meta = {
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
        },
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
    },
    edit: false,
    dev: false,

    shuffle: function (a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    },
    getRandomItem: function(collection,num) {
        num = num || 3;
        output = this.shuffle(collection);
        return output.slice(0, num);
    },
    getFormatDate: function(name){
        if(this[name]){
            return this[name].format("YYYY-MM-DD")
        }else {
            return this.date.format("YYYY-MM-DD")
        }
    }

};

module.exports = meta;