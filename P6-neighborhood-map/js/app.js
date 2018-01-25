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
		yelp_location: "jags-steak-and-seafood-and-piano-bar-west-chester-5"
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

/* ***** View Model ***** */

var viewModel = function() {
	var self = this;

	// Generate the locationMarker list from the model
	self.locationMarkerList = [];
	model.forEach(function(location){
		self.locationMarkerList.push(new google.maps.Marker({
			position: {lat: location.lat, lng: location.lng},
			map: map,
			name: location.name,
			yelp_location: location.yelp_location,
			//visible: ko.observable(location.visible),
			selected: ko.observable(location.selected),
			animation: google.maps.Animation.DROP
		}));
	});

	// Add listeners to each locationMarker
	for (var i=0; i < self.locationMarkerList; i++) {
		marker.addListener('click', function() {
			self.selectLocation(this);
		});
	}

	self.locationMarkerInfoWindow = new google.maps.InfoWindow();
	self.selectedLocationMarker = self.locationMarkerList[0];

	// Define handler for when a location is selected
	self.selectLocation = function(locationMarker) {
		if (location.name == self.selectedLocationMarker.name) {
			return;
		}
		self.selectedLocationMarker.setAnimation(google.maps.Animation.NONE);
		locationMarker.setAnimation(google.maps.Animation.BOUNCE);

        self.locationMarkerInfoWindow.open(map, locationMarker);
		
	//	var yelp_json = getYelpInfo(locationMarker.yelp_location);
	//	self.locationMarkerInfoWindow.setContent('<h5>' + locationMarker.name + '</h5>' +
	//		'<div>Yelp data still loading, please try again in a moment</div>');
        /*
		formattedLikes = function() {
        	if (self.currentMapItem.likes === "" || self.currentMapItem.likes === undefined) {
        		return "No likes to display";
        	} else {
        		return "Location has " + self.currentMapItem.likes;
        	}
        };

        formattedRating = function() {
        	if (self.currentMapItem.rating === "" || self.currentMapItem.rating === undefined) {
        		return "No rating to display";
        	} else {
        		return "Location is rated " + self.currentMapItem.rating;
        	}
        };

        var formattedInfoWindow = "<h5>" + self.currentMapItem.name + "</h5>" + "<div>" + formattedLikes() + "</div>" + "<div>" + formattedRating() + "</div>";

		infowindow.setContent(formattedInfoWindow);

        infowindow.open(map, locationMarker);
		*/

		
		self.selectedLocationMarker = locationMarker;
	};
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

function getYelpInfo(yelp_location) {
	/* Referenced this for example of a CORS workaround since Yelp does not support jsonp */
	/* https://forum.freecodecamp.org/t/authorization-http-header-for-yelp-fusion-api-access-token/140974/4 */
	const access_token = "qFQ8Y7KRTh-wM9zV8teJ30mtqemAKGskq4EgH58_PaWOxWJxPD3IiEefjSAksafIFGhTbEmH0ddQ4cHRk1oWq09FSmCckFQwIpm-Rc4VAnED5sWZYlDxvKsojTlpWnYx";
	
	let myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer " + access_token);

	fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+yelp_location, {
		headers: myHeaders 
	}).then((res) => {
		return res.json();
	}).then((json) => {
		console.log(json);
		return json;
	});
};

