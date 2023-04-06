//function for setting size
function sizeMarker(mag){
    return mag * 4;
}

// function for setting color
function setColor(eDepth) {
    if (eDepth >= -10 && eDepth < 10)return "green";
    else if (eDepth >= 10 && eDepth < 30) return "lime";
    else if (eDepth >= 30 && eDepth < 50) return "yellow";
    else if (eDepth >= 50 && eDepth < 70) return "orange";
    else if (eDepth >= 70 && eDepth < 90) return "darkorange";
    else return "red";

}

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Get GeoJSON data
d3.json(url).then(function (data){
    //pass data features to function
    createFeatures(data.features);

});

//Function gets the popup menu items data from features, creates markers, and calls the createMap function 
function createFeatures(quakeData){
    var earthquakes = L.geoJson(quakeData, {

        onEachFeature: popupdata,
        pointToLayer: createMarkers


    });

    createMap(earthquakes);

}
//Creates markers with feature and location data from goejson
function createMarkers(feature, location){

    var options = {
        stroke: true,
        color:"black",
        fill: true,
        fillColor: setColor(parseFloat(feature.geometry.coordinates[2])),
        fillOpacity: 1,
        radius: sizeMarker(feature.properties.mag),
        weight: .50,   
     };
     return L.circleMarker(location,options);
}
//Returns the popup data from the features
function popupdata(feature, layer){
    return layer.bindPopup(`<h2>${feature.properties.place}</h2><h3>Magnatude: ${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
}

//Creates the map and calls the legend function
function createMap(earthquakes){
    
    // Create map layers
    var myMap = L.map("map", {
        center: [37.787, -94.851],
        zoom: 5.45,
        layers: [earthquakes]
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    quakeLegend(myMap);



}

//Creates the legend for the map
function quakeLegend(myMap){
    let legend = L.control({
        position:"bottomright"
    });

    legend.onAdd = function(myMap) {
        let div = L.DomUtil.create("div", "legend");
        
        let limits = ['-10-10','10-30','30-50','50-70','70-90','90+'];
        let colors = ["green","lime","yellow","orange","darkorange","red"];
        let labels = [];

        // Add .
        let legendInfo = '<h1>Earthquake Depth</h1>' +
            '<div class="labels">' + 
            '</div>';

        div.innerHTML = legendInfo;

        limits.forEach(function(limit, index) {
            labels.push(`<i style="background-color: ${colors[index]}"></i><span>${limit}</span><br>`);
        });

        div.innerHTML += "<div>" + labels.join("") + "</div>";
        return div;

    };
    //Adding the legend to the map
    legend.addTo(myMap);
}

