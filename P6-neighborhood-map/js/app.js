/* ***** Global Variables ***** */
var map;

/* ***** Model ***** */

var model = [
    {
        name: "Jag's Steak & Seafood",
        lat: 39.328855,
        lng: -84.426399,
        selected: false,
        visible: true,
    },
    {
        name: "Ferrari's Little Italy and Bakery",
        lat: 39.187166,
        lng: -84.364779,
        selected: false,
        visible: true,
    },
    {
        name: "Tong's Thai",
        lat: 39.182351,
        lng: -84.274580,
        selected: false,
        visible: true,
    },
    {
        name: "Andy's Mediterranean Grille",
        lat: 39.120899,
        lng: -84.493498,
        selected: false,
        visible: true,
    },
    {
        name: "Blind Pig",
        lat:  39.098807,
        lng:  -84.513403,
        selected: false,
        visible: true,
    }
];

/* ***** Biew Model ***** */

var viewModel = function() {
	var self = this;

	// Generate the location list
	self.locationList = [];
	model.forEach(function(location){
		self.locationList.push(new google.maps.Marker({
			position: {lat: location.lat, lng: location.lng},
			map: map,
			name: location.name,
			//visible: ko.observable(location.visible),
			selected: ko.observable(location.selected),
			animation: google.maps.Animation.DROP
		}));
	});
	
	// The currently selected location
	self.currentLocation = self.locationList[0];
	
	
}

// this functon runs when the Google Maps API loads
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.1719717, lng: -84.5306452},
		zoom: 11,
		mapTypeControl: false,
		fullscreenControl: false
	});
	//markerInfo = new google.maps.InfoWindow();
	ko.applyBindings(new viewModel());
}

// This function runs if there is any issue with the Google Maps API loading
function googleError() {
	alert("Failed to load Google Maps API");
}

