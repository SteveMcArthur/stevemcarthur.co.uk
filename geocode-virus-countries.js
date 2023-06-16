const getVirusStats = require("./plugins/virus-stats");
const geocode = require("./plugins/geocode");
const path = require("path");
const fs = require("fs-extra");
let leadingcomma = /^,/;

let geocodedPath = path.join(__dirname,"assets","js");

let existingGeocode = fs.readJSONSync(path.join(geocodedPath,"geocoded-addresses.json"));
let existingAddresses = {};
existingGeocode.forEach(function(item){
  let str = item.address.replace(leadingcomma,"");
  if (existingGeocode[str]) {
    existingGeocode[str] ++;
  }else {
    //console.log("Exists: "+str);
    existingGeocode[str] = 1;
  }
})

getVirusStats(function(body){
    let output = [];
    let tpl = "{1},{2}";
    console.log("Stats: "+ body.data.covid19Stats.length);
    body.data.covid19Stats.forEach(item => {
      let str = tpl.replace("{1}",item.province).replace("{2}",item.country);
      if(!existingGeocode[str]){       
        output.push(str);
        existingGeocode[str] = 1;
      }else {
        existingGeocode[str] ++;
      }
    });
    console.log("New addresses: "+ output.length);

    

    fs.writeJSONSync("./assets/js/covid-19-coronavirus-statistics.json",body);
    fs.writeJSONSync("./assets/js/countries.json",output);
    geocode(output,function(geocodeResult){
      let combinedResult = existingGeocode.concat(geocodeResult);
      fs.writeJSONSync(path.join(geocodedPath,"geocoded-addresses-new.json"),combinedResult);
    });
    
});