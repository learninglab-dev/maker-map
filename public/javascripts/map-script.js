
var makerMap;
var markers = [];
var infoWindows = [];

function initMap() {

  makerMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 15.5,
    center: {
      lat: 42.3716,
      lng: -71.1240
      }
    });

    getData(function(data) {
       makeMarkers(makerMap, data);
   });

}


function getData(callback) {
    $.getJSON('/javascripts/map-data.json',
        function (data) {
            callback(data);
        }
    );
};


function makeMarkers(map, data) {

  for (var i = 0; i < data.length; i++) {

    var marker = new google.maps.Marker({
      position: {
        lat: data[i].lat,
        lng: data[i].lng
        },
      map: makerMap,
      title: data[i].space,
      label: data[i].number.toString(),
      tags: data[i].tags,
      animation: null,
    });

    var content = data[i].content;
    var infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker,'click', (function(marker,content,infoWindow){
    return function() {
        infoWindow.setContent(content);
        infoWindow.open(makerMap,marker);
      };
    })(marker,content,infoWindow));

       markers.push(marker);
       infoWindows.push(infoWindow)

  };


  console.log(markers);

}



function filterMarkers(tag) {
    for (i = 0; i < markers.length; i++) {

        if (markers[i].tags == tag) {
            markers[i].setVisible(true);
        }
        else {
            markers[i].setVisible(false);
            infoWindows[i].close(makerMap,markers[i]);
        }
    }
}


function showMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setVisible(true);
  }
}
