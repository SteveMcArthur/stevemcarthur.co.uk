$(function () {

    var geocodedAddresses = {}

    $.getJSON("/js/geocoded-addresses.json", function (data, status) {
        data.forEach(function (item) {
            geocodedAddresses[item.address] = {
                formatted: item.formatted,
                geometry: item.geometry
            }
        })

    });

    //create map object and set default positions and zoom level
    var map = L.map('map').setView([20, 0], 2);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var stats = [];
    $.getJSON("/js/covid-19-coronavirus-statistics.json", function (data, status) {
        stats = data.data.covid19Stats;
      
        for (var i = 0; i < stats.length; i++) {
            var item = stats[i];
            var address = item.province+","+item.country;
            var geo = geocodedAddresses[address];
            if(geo){
                var txt = geo.formatted+"<br>Deaths: "+item.deaths;
                L.circleMarker([geo.geometry.lat, geo.geometry.lng], {
                    radius: 10,
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5
                }).bindPopup(txt).addTo(map); 
            };     
        }
    });






});