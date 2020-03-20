

function Template(tmpl, keys) {
    this.tmpl = tmpl;
    this.regexList = {};
    if (keys && keys.length) {
        for (var i = 0; i < keys.length; i++) {
            this.regexList[keys[i]] = new RegExp("{{" + keys[i] + "}}", "g");
        }
    }
}

Template.prototype.exec = function (obj) {
    var txt = this.tmpl;
    if (!obj) {
        return txt;
    }
    for (var key in obj) {
        var reg = this.regexList[key];
        txt = txt.replace(reg, obj[key]);
    }
    return txt + "\n";
}

module.exports = Template;