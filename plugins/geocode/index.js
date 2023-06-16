const opencage = require('opencage-api-client');
const fs = require("fs-extra");
let finishedFunction = function(){
    console.log("Finished function");
}


function getCoords(address, cb) {
    console.log(address);
    opencage.geocode({
        q: address,
        key: "6a7e1aed3bda4f09a2aa608b4dff0a58"
    }).then(data => {
        //console.log(JSON.stringify(data));
        if (data.status.code == 200) {
            if (data.results.length > 0) {
                var place = data.results[0];
                console.log(place.formatted);
                //console.log(place.geometry);
                cb(address, place.geometry,place.formatted)
                //console.log(place.annotations.timezone.name);
            } else {
                console.log("No results...");
                cb(address,{},"");
            }
        } else if (data.status.code == 402) {
            console.log('hit free-trial daily limit');
            console.log('become a customer: https://opencagedata.com/pricing');
        } else {
            // other possible response codes:
            // https://opencagedata.com/api#codes
            console.log('error', data.status.message);
        }
    }).catch(error => {
        console.log('error', error.message);
    });
}
let output = [];
let k = 0;
let addresses = [];
let leadingcomma = /^,/;

function iterateAddresses() {

        let item = addresses[k];
        let address = item.replace(leadingcomma,"");
        getCoords(address, function (address, geometry,formatted) {
            output.push({
                address: address,
                geometry: geometry,
                formatted: formatted
            });
            k++;
            if(k < addresses.length){
                console.log(k);
                setTimeout(function(){
                    iterateAddresses();
                },100);
            } else {
                console.log("Geocoder finished...");
                finishedFunction(output);
            }
        });
   
}

function geocode(inputAddresses,cb){
    addresses = inputAddresses;
    if(cb){
        finishedFunction = cb;
    }
    
    iterateAddresses();
}


module.exports = geocode

