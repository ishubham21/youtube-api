//exposing a port to run our server on 
const PORT = 8080

//importing all the configurations from the config.js file
const config = require('./config/config')

//importing all the required modules
const express = require('express')
const { default: axios } = require('axios')
const app = express()

const connectDB = require('./controllers/connection')   //an asynchronos function to establish a connection with the database
connectDB().then(async () => {

    const addToDatabase = require('./controllers/addData')  //a function tto add video details in our database
    const findVideoById = require('./controllers/findVideo')    //a function to search if the video already exists on the database

    //adding data to the database only if there is no error by making use of a try-catch block
    try {

        const response = await axios.get(config.url, {  //making a GET request at the request URL imported from config.js file
            params: config.urlParams    //applying the URL parameters on the request URL
        })
        const data = response.data.items
        
        //saving each video one-by-one in the database
        data.forEach(async (video) => {
            if(!(await findVideoById(video.id.videoId))){    //don't add the video in database if the video with the same id is already present
                addToDatabase({
                    title: video.snippet.title,
                    videoId: video.id.videoId,
                    description: video.snippet.description,
                    thumbnails: video.snippet.thumbnails,
                    publishedOn: video.snippet.publishTime
                })
            } 
        });

    } catch (error) {
        console.log('Error occured while adding to the database') //sending back the error to express server to be sent as a response
    }

}).catch(err => {   //catching all the errors that might happend 
    console.log('An error occured while connecting to the DB')
})

app.get('/search', async (req, res, next) => {



})



app.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
})