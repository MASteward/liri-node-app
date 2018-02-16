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

if (command === "my-tweet"){
	showTweets();
}
else if (command === "spotify-this-song") {
	spotifySong();
}


var myTwitter = {screen_name: 'matt__1001'};
client.get('statuses/user_timeline', myTwitter, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});