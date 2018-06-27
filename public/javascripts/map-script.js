//note: putting the data in here like this is a patch until I an figure out the issue below. See comment ~117.
var data = [
  {
    "number": 1,
    "space": "Ceramics Studio",
    "lat": 42.3627,
    "lng": -71.1311,
    "address": "224 Western Ave",
    "hours": "Monday-Friday 9 AM-5 PM",
    "website": "https://ofa.fas.harvard.edu/ceramics-studio",
    "tools": "pottery wheels, kilns",
    "who": "class students (including public)",
    "tags": "exists",
    "content": '<h1 id="firstHeading" class="firstHeading">Ceramics Studio</h1>'

  },
  {
    "number": 2,
    "space": "Freshman Arts Room",
    "lat": 42.3755,
    "lng": -71.1172,
    "address": "Holworthy basement",
    "hours": "24 hrs w/ swipe access",
    "website": "https://fdo.fas.harvard.edu/files/fdo/files/holworthy_art_room_guidelines_2017-18.pdf",
    "tools": "brushes, pencils, sketchbooks, drawing boards",
    "who": "freshmen, but must contact correna_cohen@harvard.edu for initial access"
  },
  {
    "number": 3,
    "space": "Harvard Dance Center",
    "lat": 42.3815,
    "lng": -71.1268,
    "address": "66 Garden Street",
    "hours": "Dance Office hours are 9:30am-5:30pm M-F, but access to Dance Center space is available 9:30am-12am",
    "website": "https://ofa.fas.harvard.edu/harvard-dance-center",
    "tools": "2 studios, 1 green room. Mirrors, barres, sprung floor with marley (2 studios), pianos. Dressing rooms, showers, gender neutral restrooms",
    "who": "Undergraduate students + non-student by request"
  },
  {
    "number": 4,
    "space": "LaunchPad",
    "lat": 42.3749,
    "lng": -71.1217,
    "address": "HGSE, Gutman Library, 6 Appian Way",
    "hours": "9am-5pm interim summer; 8am- 11pm academic year",
    "website": "",
    "tools": "access to FXCP on Mac.",
    "who": "Graduate students (masters & doctoral)"
  },
  {
    "number": 5,
    "space": "Director's Studio",
    "lat": 42.3718,
    "lng": -71.1185,
    "address": "Office for the Arts, 74 Mt Auburn",
    "hours": "M-Th 4:30pm-11pm, F: closed, Saturday: 9am-5pm, Sunday: noon-11pm",
    "website": "https://ofa.fas.harvard.edu/harvard-dance-center",
    "tools": "mirrors, sound system, barres, sprung floor with marley, upright piano.",
    "who": ""
  },
  {
    "number": 6,
    "space": "Paine Hall",
    "lat": 42.3767,
    "lng": -71.1176,
    "address": "3 Oxford St",
    "hours": "10 am - 11 pm (during the year, alternate hours for summer/holidays)",
    "website": "",
    "tools": "grand pianos, standing pianos, a harpsichord",
    "who": "anyone with a valid Harvard ID"
  },
  {
    "number": 7,
    "space": "Recording Studio",
    "lat": 42.381,
    "lng": -71.1252,
    "address": "SOCH Penthouse",
    "hours": "by appointment or with several sound engineer training sessions",
    "website": "https://soch.fas.harvard.edu/recording-studio",
    "tools": "microphones, mixer, preamp, monitors, headphones",
    "who": "Harvard undergraduates"
  },
  {
    "number": 8,
    "space": "Memorial Hall",
    "lat": 42.3759,
    "lng": -71.1149,
    "address": "45 Quincy St",
    "hours": "",
    "website": "https://ofa.fas.harvard.edu/rehearsal-practice-space",
    "tools": "Room 014 (drum kit, upright piano); Room 015 (timpani, marimba); Room 016 (upright piano)",
    "who": ""
  },
  {
    "number": 9,
    "space": "Lowell Lecture Hall",
    "lat": 42.3767,
    "lng": -71.1154,
    "address": "17 Kirkland Street",
    "hours": "M-Th 3pm-12am, Sat 8am-3pm, Sunday 8am-12am",
    "website": "https://sites.fas.harvard.edu/~memhall/lhapplication.html",
    "tools": "stage (wood floor)",
    "who": "officially recognized FAS student groups"
  },
  // {
  //   "number": 10,
  //   "space": "Harvard Ed Portal",
  //   "lat": 42.3626,
  //   "lng": -71.1312,
  //   "address": "224 Western Ave, Allston, MA 02134",
  //   "hours": "",
  //   "website": "https://edportal.harvard.edu/",
  //   "tools": "studios",
  //   "who": "Harvard community; some programs restricted to Allston/Brighton residents"
  // }
]

var makerMap;
var markers = [];
var infowWindows = [];

function initMap() {

  makerMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 15.5,
    center: {
      lat: 42.3716,
      lng: -71.1240
      }
  });

//Makes little stars for icons on the map. I need to learn more about vector graphics on maps before using this type of icon.
  // var star = {
  //   path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
  //   fillColor: 'DarkRed',
  //   fillOpacity: 0.8,
  //   scale: .1,
  //   strokeColor: 'teal',
  //   strokeWeight: 2
  // };


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
       infowWindows.push(infoWindow)

  };


  console.log(markers);

}


function filterMarkers() {
    for (i = 0; i < markers.length; i++) {

        marker = markers[i];
        infoWindow = infowWindows[i];

        if (marker.tags == 'exists') {
            marker.setVisible(true);
        }
        else {
            marker.setVisible(false);
            infoWindow.close(makerMap,marker);
        }
        // markers[i] = marker;
    }
}

function showMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setVisible(true);
  }
}
