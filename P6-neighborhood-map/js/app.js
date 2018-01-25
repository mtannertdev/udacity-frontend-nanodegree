/* ***** Global Variables ***** */
var map;

/* ***** Model ***** */

var model = [
    {
        name: "Jag's Steak & Seafood",
        lat: 39.328855,
        lng: -84.426399,
        selected: false,
        shown: true,
		yelp_location: "jags-steak-and-seafood-and-piano-bar-west-chester-5"
    },
    {
        name: "Ferrari's Little Italy and Bakery",
        lat: 39.187166,
        lng: -84.364779,
        selected: false,
        shown: true,
		yelp_location: "ferraris-little-italy-and-bakery-madeira-2"
    },
    {
        name: "Tong's Thai",
        lat: 39.182351,
        lng: -84.274580,
        selected: false,
        shown: true,
		yelp_location: "tongs-thai-milford"
    },
    {
        name: "Andy's Mediterranean Grille",
        lat: 39.120899,
        lng: -84.493498,
        selected: false,
        shown: true,
		yelp_location: "andys-mediterranean-grill-cincinnati"
    },
    {
        name: "Blind Pig",
        lat:  39.098807,
        lng:  -84.513403,
        selected: false,
        shown: true,
		yelp_location: "blind-pig-cincinnati"
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
			//yelp_data: getYelpInfo(location.yelp_location),
			yelp_location: location.yelp_location,
			shown: ko.observable(location.shown),
			selected: ko.observable(location.selected),
			animation: google.maps.Animation.DROP
		}));
	});


	// Add listeners to each locationMarker
	for (var i=0; i < self.locationMarkerList.length; i++) {
		self.locationMarkerList[i].addListener('click', function() {
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

		var infoWindowContent = "<h5>" + locationMarker.name + "</h5>";
		if (locationMarker.yelp_data != null) {
			infoWindowContent += "<div>Yelp rated "+ locationMarker.yelp_data.rating + "/5 with " + locationMarker.yelp_data.review_count + " reviews</div>";
        } else {
			infoWindowContent += "<div>Yelp data not available yet</div>";
		}
		self.locationMarkerInfoWindow.setContent(infoWindowContent);		
        self.locationMarkerInfoWindow.open(map, locationMarker);
		
		self.selectedLocationMarker = locationMarker;
	};
	
	// create a search observable for search text
	self.searchText = ko.observable();

	// calls every keydown from input box
	self.updateLocations = function() {
		self.locationMarkerInfoWindow.close();

		var search = self.searchText();

		//search the list
		if (search.length === 0) {
			for (var i=0; i < self.locationMarkerList.length; i++) {
				self.locationMarkerList[i].setMap(map);
				self.locationMarkerList[i].shown = true;
			}
		} else {
			for (var i=0; i < self.locationMarkerList.length; i++) {
				if (self.locationMarkerList[i].name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
					self.locationMarkerList[i].setMap(map);
					self.locationMarkerList[i].shown = true;
				} else {
					self.locationMarkerList[i].setMap(null);
					self.locationMarkerList[i].shown = false;
				}
			}
		}
	};
	
	
	self.addYelpData = function(yelp_location) {
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
			for (var i=0; i < self.locationMarkerList.length; i++) {
				if (self.locationMarkerList[i].yelp_location == yelp_location) {
					self.locationMarkerList[i].yelp_data = json;
				}
			}
		});
	};

	// Add Yelp data to each locationMarker
	for (var i=0; i < self.locationMarkerList.length; i++) {
		self.addYelpData(self.locationMarkerList[i].yelp_location)
	}
}

// this functon runs when the Google Maps API loads
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.2119717, lng: -84.4306452},
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

