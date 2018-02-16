js
require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spoitfy");
var client = new twitter(keys.twitterKeys);
var fs = require("fs");

var nodeArgv = process.argv;
var command = process.argv[2];

var userRequest = "";

if (command === "my-tweet"){
	tweets();
}
else if (command === "spotify-this-song") {
	spotifyMusic();
}

else if (command === "movie-this") {
	movieSearch()
}

function tweet (){ 
	var myTwitter = {screen_name: 'matt__1001'};
	client.get('statuses/user_timeline', myTwitter, function(error, tweets, response) {
	  if (error){
	  	console.log("Error!" + error)
	  } 
	  else {
	    console.log(tweets);
	  }
	});
}

function spotifyMusic() {
	spotify.search({ type: 'track', query: 'song' }, function(err, data) {
	    if (err) {
	    	console.log("Error!" + err);
	    }
	    else {
	    	for (var i = 0; i < data.tracks.items.length; i++) {
	    		var musicInfo = data.tracks.items[i];
	    		console.log("Artist(s): " + musicInfo.artist[i].name);
	    		console.log("Song Title: " + musicInfo.name);
	    		console.log("Preview Song: " + musicInfo.preview_url);
	    		console.log("Album: ": + musicInfo.album.name);
	    	}	
	    }
	});
}

function movieSearch(){
	
}

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.