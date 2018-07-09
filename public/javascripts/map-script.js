var makerMap;
var markers = [];
var infoWindows = [];


function initMap() {

  makerMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {
      lat: 42.3716,
      lng: -71.1240
      }
    });

    makeMarkers(makerMap, data);

}


function makeMarkers(map, data) {

  console.log(map);

  for (var i = 0; i < data.length; i++) {

    console.log(data[i]);

if (data[i].name == 'LL') {

    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(data[i].latitude),
        lng: parseFloat(data[i].longitude)
        },
      map: map,
      title: data[i].name,
      label: '',
      tags: data[i].tags[0],
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    });

  }
else {
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(data[i].latitude),
        lng: parseFloat(data[i].longitude)
        },
      map: map,
      title: data[i].name,
      label: (i).toString(),
      tags: data[i].tags[0],
      animation: null,
    });

  }

    var content = data[i].name;
    var infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker,'click', (function(marker,content,infoWindow){
    return function() {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      };
    })(marker,content,infoWindow));

       markers.push(marker);
       infoWindows.push(infoWindow)

};


console.log(markers);
console.log(infoWindows);

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
