
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

	var google_url = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + $('#street').val() + ", " + $('#city').val();
	console.log(google_url);
    $body.append('<img class="bgimg" src="' + google_url + '">');

    return false;
};

$('#form-container').submit(loadData);
