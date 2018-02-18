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
var movie = "";
var song = "";		

function runIt(command, request){ 
	var command = process.argv[2];
	var nodeArgs = process.argv;
	checkIt(command, nodeArgs);
}



//========= Check the command var to initiate function ============
function checkIt(command, nodeArgs){

	if (command == "my-tweet"){
		
		tweetTweet();

	} 

	else if (command == "spotify-this-song"){
		if (nodeArgs.length > 3){
			song = nodeArgs[3];
			for (var i = 4; i < nodeArgs.length; i++) {
		    song += " " + nodeArgs[i];
			}
			listenUp(song);
		} 
		else {
			song = "The Sign Ace of Base";
			listenUp(song);
		}
	} 
	
	else if (command == "movie-this"){
		if (nodeArgs.length > 3){
			movie = nodeArgs[3];
			for (var i = 4; i < nodeArgs.length; i++) {
				movie = "+" + nodeArgs[i];
			}
			jiffyPop(movie);
		} 
		else {
			movie = "Mr.+Brooks";
			jiffyPop(movie);
		}
	} 
	else if (command == "do-what-it-says") {
		
		justDoIt();

	}
}

 //==================== TWITTER ======================

function tweetTweet(){
	var params = {screen_name: 'matt__1001'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log("\n======================================\n")
	  	for (var i in tweets) {
		  	console.log("Date: " + tweets[i].created_at);
		  	console.log("Tweet: " + tweets[i].text);

		  	console.log("\n======================================\n");
	  	}
	  } 
	  else {
			console.log(error);
		}
	})
}

//===================== SPOTIFY ======================

function listenUp(song){
	spotify.search({ type: 'track', query: song}, function(err, data) {
	  if (err) {
	    console.log('Error occurred: ' + err);
  	}
  	else {
  		console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
  		console.log("\nSong: " + data.tracks.items[0].name);
  		console.log("\nPreview Link: " + data.tracks.items[0].preview_url);
  		console.log("\nAlbum: " + data.tracks.items[0].album.name);
  	}
  });
}

//===================== OMDB =========================

function jiffyPop(movie){
	request("http://www.omdbapi.com/?t=" + movie + "&apikey=1287a108", function(error, response, body) {

  	if (!error && response.statusCode === 200) {
  		var movieObj = JSON.parse(body);

	    console.log("\nTitle: " + movieObj.Title);
	    console.log("\nYear of Release: " + movieObj.Year);
	    console.log("\nIMDB Rating: " + movieObj.imdbRating);
	    console.log("\nRotten Tomatoes Rating: " + movieObj.Ratings[1].Value);
	    console.log("\nCountries Produced: " + movieObj.Production);
	    console.log("\nLanguage: " + movieObj.Language);
	    console.log("\nPlot: " + movieObj.Plot);
	    console.log("\nCast: " + movieObj.Actors);
  	}
  })
}

//==================== JUST-DO-IT =====================

function justDoIt(){
	fs.readFile("random.txt", "utf8", function(err, data){
		if (!err){
			var prefer = [];
			data.split(" ").forEach(function(item){
				prefer.push(item);
			});
			iDecide = prefer.shift();
			prefer = prefer.join(" ").replace('"', "");
			prefer = prefer.replace('"', "");
			console.log(iDecide);
			console.log(prefer);
			// checkIt(iDecide, prefer);
			listenUp(prefer);

		}	
	})
}



runIt(process.argv[2], process.argv);







