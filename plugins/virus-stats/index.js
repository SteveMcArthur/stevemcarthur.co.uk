const unirest = require("unirest");

let cache = {}
const expiretime = 1000 * 60 * 60 * 3; //three hours
function getStats(cb) {
    if(cache.time){
        let now = (new Date()).getTime();
        if((now - cache.time) < expiretime){
            cb(cache);
            return;
        }
    }
    
    
    
    const req = unirest("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats");

    req.headers({
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "6cd7107b6cmsh88259036196657dp1338ecjsn8042a1e8263b"
    });

    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        cache = res.body;
        cache.time = (new Date()).getTime();
        cb(res.body);
    });
}


module.exports = getStats;