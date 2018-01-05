//Global variables
// ----------------------------------------------------------------- //
// Create a map variable.
var map;
// Create a single infowindow variable.
var infowindow;
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

    //Constructor creates a new google maps InfoWindowr.
    infowindow = new google.maps.InfoWindow();

    // Style the markers a bit. This will be our listing marker icon.
    //var defaultIcon = makeMarkerIcon('f03737');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    //var highlightedIcon = makeMarkerIcon('0091ff');

    // Set market to the map.
    this.marker = new google.maps.Marker({
        position: self.location(),
        title: self.title(),
        address: self.address(),
        map: map
    });

    // Create an onclick event to open an infowindow at each marker.
    this.marker.addListener('click', function () {
        populateInfoWindow(self.marker, infowindow);
    });

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div><h1>' + marker.title + '<h1>' +
                '<p><strong>Address: </strong><span>' + marker.address +
                '<span></p></div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
        }
    }

};

var ViewModel = function() {
    var self = this;

    // Create a new blank array for all the listing markers.
    this.markers = ko.observableArray([]);

    // Function to initialize the map within the map div
    this.initMap = function () {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(54.698052, 25.271241),
            zoom: 15,
            styles: stylesArray,
            mapTypeControl: false
        };
        // Constructor creates a new Map inside of the given HTML container.
        map = new google.maps.Map(mapCanvas, mapOptions);

    };

    this.initMap();

    markersModel.markers.forEach(function(markerItem){
        self.markers.push(new LocationMarker(markerItem));
        //console.log(markerItem);
    });

    //this.currentmMrker = ko.observable(this.markers()[0]);

};

// Google Maps API callback function for starting the appl
function startApp() {
    ko.applyBindings(new ViewModel());
};