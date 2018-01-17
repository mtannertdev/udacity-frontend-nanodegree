
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes
    
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
		'api-key': "ae1411f93d694f659eb59d1115538adb",
		'q': $('#city').val()
	});
	console.log(url);
	$.getJSON(url, function (data) {
		$nytHeaderElem.text("New York Times articles about " + $('#city').val());
		articles = data.response.docs;
		for (var i = 0; i < articles.length; i++) {
			var article = articles[i];
			console.log(article);
			$nytElem.append('<li class="article">');
			$nytElem.append('<a href="' + article.web_url + '">' + article.headline.main + '</a>');
			$nytElem.append('<p>' + article.snippet + '</p>');
			$nytElem.append('</li>');
		}
	}).error(function(e) {
		$nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
	});
	
	
	//articles = data.response.docs;
	//console.log(articles.length);
	//console.log(articles.length[0]);
	//for (i=0; i < data.response.docs.length; i++) {
	//	$nytElem.append('<li class="article">');
	//	$nytElem.append('<a href="' + a.web_url + '">' + a.headline.main + '</a>');
	//	$nytElem.append('<p>' + a.multimedia.snippet + '</p>');
	//	$nytElem.append('</li>');
	//}

    return false;
};

$('#form-container').submit(loadData);
