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

// console.log(command);
//========= Check the command var to initiate function ============

if (command === "my-tweet"){

	var params = {screen_name: 'matt__1001'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log("Tweet: " + tweets.text);
	  	// for (var i = 0; i < 20; i++) {
	  	// console.log("Date: " + tweets[i].created_at);
	  	// console.log("Tweet: " + tweets[i].text);
	  	// }

		}
		else{
			console.log(error);
		}
	})
}

else if (command === "spotify-this-song"){
	if (identify === empty) {
		// identify = "The Sign by Ace of Base";
		
		spotify.search({ type: 'track', query: "The Sign"}, function(err, data) {
		  console.log("hey", data);
		  if (err) {
		    console.log('Error occurred: ' + err);
	  	}
	  	else {
	  		console.log("heyhey")
	  		console.log(data.name);
	  		console.log(data.album);
	  		console.log(data.preview_url);
	  	}
	  });
	}
}

else if (command == "movie-this"){
	request("http://www.omdbapi.com/?t=" + identify + "&apikey=1287a108", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  	if (!error && response.statusCode === 200) {
  		var movieObj = JSON.parse(body);
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("Title: " + JSON.parse(body).Title);
	    console.log("Year of Release: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    console.log("Rotten Tomatoes Rating: " + movieObj.Ratings[1].Value);
	    console.log("Countries Produced: " + JSON.parse(body).Production);
	    console.log("Language: " + movieObj.Language);
	    console.log("Plot: " + movieObj.Plot);
	    console.log("Cast: " + movieObj.Actors);
  	}
  })
}




// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.