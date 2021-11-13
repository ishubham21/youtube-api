//config file to separate and export all the config 

//since we are using configurations from the .env file
const dotenv = require('dotenv')
dotenv.config()

//breaking the URL down into smaller managable parts to ease the development process
const baseApiUrl = 'https://www.googleapis.com/youtube/v3/'
const apiKey = process.env.API_KEY  //we have saved our API key in the .env that is a secret file to store secret configurations and keys

//parameters to be used in the url 
const urlParams = {
    type: 'video',
    part: 'snippet',
    maxResults: 50, //setting the number of results we want in a single API call
    publishedAfter: '2010-01-01T00:00:00Z', //to get videos after 01 Jan, 2010 - using this date format since Youtube API supports request in RFC 3339 format
    order: 'date',  //to fetch videos in the reverse chronological order
    q: 'football'   //pre-defined query string i.e. football
}

//exporting the URL config
module.exports = {
    url: `${baseApiUrl}search?key=${apiKey}`,
    urlParams
}