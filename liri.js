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
var nodeArgs = process.argv;
var movie = "";
var song = "";

if (command == "movie-this" || command == "spotify-this-song" && (nodeArgs.length >= 3)){
	if (nodeArgs.length == 3){
		movie = "Mr.+Brooks";
		song = "The Sign Ace of Base";		
	} else {
		movie = nodeArgs[3];
		song = nodeArgs[3];
		for (var i = 4; i < nodeArgs.length; i++) {
	    movie += "+" + nodeArgs[i];
	    song += " " + nodeArgs[i];
	  }
	}
}

//========= Check the command var to initiate function ============

if (command == "my-tweet"){

	var params = {screen_name: 'matt__1001'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i in tweets) {
		  	console.log("Date: " + tweets[i].created_at);
		  	console.log("Tweet: " + tweets[i].text);
	  	}
	  } 
	  else {
			console.log(error);
		}
	})
}

else if (command == "spotify-this-song"){
	console.log(song)
	spotify.search({ type: 'track', query: song}, function(err, data) {
	  if (err) {
	    console.log('Error occurred: ' + err);
  	}
  	else {
  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
  		console.log("Song: " + data.tracks.items[0].name);
  		console.log("Preview Link: " + data.tracks.items[0].preview_url);
  		console.log("Album: " + data.tracks.items[0].album.name);
  	}
  });
}

else if (command == "movie-this"){
	request("http://www.omdbapi.com/?t=" + movie + "&apikey=1287a108", function(error, response, body) {

  	if (!error && response.statusCode === 200) {
  		var movieObj = JSON.parse(body);

	    console.log("Title: " + movieObj.Title);
	    console.log("Year of Release: " + movieObj.Year);
	    console.log("IMDB Rating: " + movieObj.imdbRating);
	    console.log("Rotten Tomatoes Rating: " + movieObj.Ratings[1].Value);
	    console.log("Countries Produced: " + movieObj.Production);
	    console.log("Language: " + movieObj.Language);
	    console.log("Plot: " + movieObj.Plot);
	    console.log("Cast: " + movieObj.Actors);
  	}
  })
}

