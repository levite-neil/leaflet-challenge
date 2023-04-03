//function for setting size
function sizeMarker(mag){
    return mag * 5;
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
    createFeatures(data.features);

});

function createFeatures(quakeData){
    var earthquakes = L.geoJson(quakeData, {

        onEachFeature: popupdata,
        pointToLayer: createMarkers


    });

    createMap(earthquakes);

}
//Create markers
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

function popupdata(feature, layer){
    return layer.bindPopup(`<h2>${feature.properties.place}</h2><h3>Magnatude: ${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
}

//Create map
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

// function quakeLegend(myMap){
//     let legend = L.control({
//         position:"bottomright"
//     });

//     legend.onAdd = function(myMap) {
//         let div = L.DomUtil.create("div", "legend");
        
//         let limits = ['-10-10','10-30','30-50','50-70','70-90','90+'];
//         let colors = ["green","lime","yellow","orange","darkorange","red"];
//         let labels = [];

//         // Add .
//         let legendInfo = '<h1>Earthquake Depth</h1>' +
//             '<div class="labels">' + 
//             '</div>';

//         div.innerHTML = legendInfo;

//         limits.forEach(function(limit, index) {
//             labels.push(`<li style="background: ${colors[index]}">${limit}</li>`);
//         });

//         div.innerHTML += "<i>" + labels.join("<br>") + "</i>";
//         return div;

//     };
//     //Adding the legend to the map
//     legend.addTo(myMap);
// }
function quakeLegend(myMap){
/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Tegnforklaring</h4>";
  div.innerHTML += '<i style="background: #477AC2"></i><span>Water</span><br>';
  div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';
  div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
  div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
  div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  
  

  return div;
};

legend.addTo(myMap);
}
