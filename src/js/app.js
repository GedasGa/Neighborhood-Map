//Global variables
// ----------------------------------------------------------------- //
// Create a map variable.
var map;
// Create a single infowindow variable.
var infowindow;
// Create a single bounds variable to track map bounds.
var bounds;
// ----------------------------------------------------------------- //

// Data model
// ----------------------------------------------------------------- //
var markersModel = {
    currentMarker: ko.observable(null),
    markers: [
        { 
            title: "Quadrum",
            location: { lat: 54.698355, lng: 25.270992 },
            address: "Konstitucijos pr. 21" 
        },
        { 
            title: "Swedbank",
            location: { lat: 54.695926, lng: 25.273732 }, 
            address: "Konstitucijos pr. 20A" 
        },
        { 
            title: "Europa", 
            location: { lat: 54.696214, lng: 25.276796 }, 
            address: "Konstitucijos pr. 7" 
        },
        { 
            title: "K29", 
            location: { lat: 54.699611, lng: 25.265009 }, 
            address: "Konstitucijos pr. 29" 
        },
        { 
            title: "3 Burės",
            location: { lat: 54.696533, lng: 25.279056 }, 
            address: "Lvovo g. 25" 
        }
    ]
};

var stylesArray = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
    }
];
// ----------------------------------------------------------------- //

var LocationMarker = function(data) {
    var self = this;

    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
    this.address = ko.observable(data.address);

    // Add new observable to check if marker should be visible
    this.visible = ko.observable(true);

    //Content string for infowindow.
    var contentString = '<div><h1>' + this.title() + '</h1>' +
                        '<p><strong>Address: </strong><span>' + this.address() +
                        '</span></p></div>';

    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('f03737');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('0091ff');

    this.marker = new google.maps.Marker({
        position: self.location(),
        title: self.title(),
        address: self.address(),
        animation: google.maps.Animation.DROP,
        icon: defaultIcon
    });

    // Create an onclick event to open an infowindow at each marker.
    this.marker.addListener('click', function () {
        populateInfoWindow(self.marker, infowindow, contentString);
        panToMarker(self.marker);
        toggleBounce(self.marker);
    });

    // Trigger marker's click when it's title is cliked in sidebar
    this.triggerMarkerClick = function (marker) {
        google.maps.event.trigger(self.marker, 'click');
    };

    // Create two event listeners - one for mouseover, one for mouseout,
    // to change the marker icon colors back and forth.
    this.marker.addListener('mouseover', function () {
        //set highligthed icon color
        this.setIcon(highlightedIcon);
    });
    this.marker.addListener('mouseout', function () {
        //set default icon color
        this.setIcon(defaultIcon);
    });

    // This function will set marker on the map and extend map bounds.
    this.showMarker = ko.computed(function () {
        if (this.visible() === true) {
            this.marker.setMap(map);
            bounds.extend(self.marker.position);
            map.fitBounds(bounds);
        } else {
            this.marker.setMap(null);
        }
    }, this);

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    function populateInfoWindow(marker, infowindow, contentString) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
        }
    }

    //This function sets map zoom to 18 and centers map to selected marker position.
    function panToMarker(marker) {
        map.setZoom(18);
        map.setCenter(marker.position);
    };

    //This function add bounce animation to marker when clicked on it. It has a
    //timeout function which sets animation to null again after 1500ms.
    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {marker.setAnimation(null);}, 1500);
        }
    }

    // This function takes in a COLOR, and then creates a new marker
    // icon of that color. The icon will be 25 px wide by 35 high, have an origin
    // of 0, 0 and be anchored at 10, 34).
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(25, 35),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(25, 35));
        return markerImage;
    }
};

var ViewModel = function() {
    var self = this;

    // Create a new blank array for all the listing markers.
    this.markers = ko.observableArray([]);

    this.searchLocation = ko.observable("");

    // Function to initialize the map within the map div
    this.initMap = function () {
        var mapCanvas = document.getElementById('map');
        console.log(mapCanvas);
        var mapOptions = {
            center: new google.maps.LatLng(54.698052, 25.271241),
            zoom: 15,
            styles: stylesArray,
            mapTypeControl: false
        };
        // Constructor creates a new Map inside of the given HTML container.
        map = new google.maps.Map(mapCanvas, mapOptions);

        //Constructor creates a new Google Maps InfoWindow.
        infowindow = new google.maps.InfoWindow();

        //Constructor creates a new Google Maps LatLngBounds.
        bounds = new google.maps.LatLngBounds();

    };

    this.initMap();


    // Set initial location markers
    markersModel.markers.forEach(function(markerItem){
        self.markers.push(new LocationMarker(markerItem));
    });

    this.filteredLocations = ko.computed(function() {
        // console.log(filter);
        var filter = self.searchLocation().toLowerCase(); // get string from search box
        // If filter is empty, set all markers to visible. (All visibile by default.)
        if (!filter) {
            self.markers().forEach(function(markerItem) {
                markerItem.visible(true);
            });
            return self.markers();
        // Else filter markers array by setting markers visible to true or false.
        } else {
            return ko.utils.arrayFilter(self.markers(), function(markerItem) {
                var string = markerItem.title().toLowerCase();
                var result = (string.search(filter) >= 0);
                markerItem.visible(result);
                return result;                
            });
        }
    }, self);
    

};

// Google Maps API callback function for starting the app.
function startApp() {
    ko.applyBindings(new ViewModel());
};

$(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 56; // Calculate the top offset

    $('#map').css('height', (h - offsetTop));
}).resize();

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#menu-toggle").toggleClass("toggled");
});
