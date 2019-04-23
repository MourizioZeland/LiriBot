// required dotenv package
require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var input = process.argv[2]

var Spotify = require('node-spotify-api');
var axios = require("axios");
//var axios = require("axios");

//command inputs

    switch (input) {
        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-me-this":
            movieMeThis();
            break;

        case "concert-me-this":
            concertMeThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;

    }




// variable that contains require key.js file


function spotifyThisSong(entry) {

    var spotify = new Spotify(keys.spotify);

    var entry = process.argv[3]



    spotify.search({ type: 'track', query: entry }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(JSON.stringify(data, null, 2))
        var songs = data.tracks.items[0];

        // Console log Spotify
        console.log("artist(s): " + songs.artists[0].name);
        console.log("Song Name: " + songs.name);
        console.log("Preview Song: " + songs.preview_url);
        console.log("Album: " + songs.album.name);
        console.log("-----------------------------------------------");

    })

}
function movieMeThis() {
    var title = process.argv.splice(3).join(" ")
    var queryURL = "https://www.omdbapi.com/?t=" + title + "&apikey=trilogy";
    axios.get(queryURL).then(function(response){
    var movies = response.data;
        //for (var i = 0; i < movies.length; i++) {  
        console.log("**********MOVIE INFO*********");  
        console.log("Title of the movie: " + movies.Title);
        console.log("Year the movie came out: " +  movies.Year);
        console.log("Country where the movie was produced: " +  movies.Country);
        console.log("Language of the movie " +  movies.Language);
        console.log("Plot of the movie: " +  movies.Plot);
        console.log("Actors in the movie: " +  movies.Actors);
        console.log("*****************************");
   //}

    
});}

function concertMeThis(){
    var artist = process.argv.splice(3).join(" ")
   var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
   axios.get(queryUrl).then(function(response) {
            // If the request is successful
            //if (!error && response.statusCode === 200) {
                var concerts = response.data;
                for (var i = 0; i < concerts.length; i++) {  
                    console.log("**********EVENT INFO*********");  
                    console.log("Name of the Venue: " + concerts[i].venue.name);
                    console.log("Venue Location: " +  concerts[i].venue.city);
                    console.log("Date of the Event: " +  concerts[i].datetime);
                    console.log("*****************************");
                }
            //} else{
            //  console.log('Error occurred.\n', error);
           // }
        });}


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
			throw error
        };
        
     var dataArr = data.split(',');
       
        if (dataArr[0] === "spotify-this-song"){
            process.argv[3] = dataArr[1];
            spotifyThisSong();
        }
       
        
    });
    
    //console.log("hello petty");
}

