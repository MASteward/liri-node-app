require("dotenv").config();

var keys = require("./keys.js");
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

// ========== Constructors ==============
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// =============== Store user input =================


var command = process.argv[2];
var identify = process.argv[3];
var empty = "";
// console.log(identify);

console.log(command);
//========= Check the command var to initiate function ============

if (command === "my-tweet") {

	var params = {screen_name: 'matt__1001'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < 20; i++) {
	  	console.log("Date: " + tweets[i].created_at);
	  	console.log("Tweet: " + tweet[i].text);
	  	}

		} else{
			console.log(error);
		}
	})
}

else if (command === "spotify-this-song") {
	if (identify === null) {
		identify = "The Sign by Ace of Base";
		
		spotify.search({ type: 'track', query: identify}, function(err, data) {
		  console.log(data);
		  if (err) {
		    console.log('Error occurred: ' + err);
	  	} else {
	  		// console.log(data.tracks.items[0].album);
	  		console.log(data.artist.name);
	  		console.log(data.audio_features.track_href);
	  		console.log(data.album.name);
	  		console.log(data.preview_url);
	  	}
	  });
	}
}





// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.