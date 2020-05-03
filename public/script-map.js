console.log("script map!");

var map;
var service;
var infowindow;

function initMap() {
  var sgp = new google.maps.LatLng(1.3521, 103.8198);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: sgp,
    //10 is for cities, 15 is for streets
    zoom: 12,
  });
  let clubNameArr = document.getElementsByClassName("club-name");
  //Get postal code info of each club 
  for (let i = 0; i < clubNameArr.length; i++) {
    let queryText = clubNameArr[i].getAttribute("postcode");
    let name = clubNameArr[i].textContent;
    console.log("queryText: ", queryText);
    var request = {
      //Google query the club postal code
      query: queryText,
      fields: ["name", "geometry"],
    };
    service = new google.maps.places.PlacesService(map);
    function cbQuery(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        //Create location marker for the first result found for each postal code
        createMarker(results[0], name);
      }
    }
    service.findPlaceFromQuery(request, cbQuery);
  }
}

function createMarker(place, content) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", function () {
    infowindow.setContent(content);
    infowindow.open(map, this);
  });
}
