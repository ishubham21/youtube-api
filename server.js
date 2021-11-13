//importing all the required modules
const express = require('express')
const { default: axios } = require('axios')
const app = express()
app.use(express.json())     //to make sure that the JSON data is read too

const cors = require('cors')
app.use(cors())

//exposing a port to run our server on 
const PORT = 8080

//importing all the configurations from the config.js file
const config = require('./config/config')

const connectDB = require('./controllers/connection')   //an asynchronos function to establish a connection with the database
connectDB().then(async () => {

    const addToDatabase = require('./controllers/addData')  //a function tto add video details in our database
    const findVideoById = require('./controllers/findVideo')    //a function to search if the video already exists on the database

    //continuosly calling the Youtube API at an interval of 10000ms i.e 10s
    setInterval(async () => {
        //adding data to the database only if there is no error by making use of a try-catch block
        try {

            const response = await axios.get(config.url, {  //making a GET request at the request URL imported from config.js file
                params: config.urlParams    //applying the URL parameters on the request URL
            })
            const data = response.data.items

            try {
                //saving each video one-by-one in the database
                data.forEach(async (video) => {
                    if (!(await findVideoById(video.id.videoId))) {    //querying the database to search if a video by similar videoId exists on the database
                        addToDatabase({
                            title: video.snippet.title,
                            videoId: video.id.videoId,
                            description: video.snippet.description,
                            thumbnails: video.snippet.thumbnails,
                            publishedOn: video.snippet.publishTime
                        })
                    }
                });
            } catch (error) {   //catch erros caused by the mongoDB server 
                console.log('Error adding to the database')
            }

        } catch (error) {   //if an error is created by the YouTube API
            if (error.response) {
                console.log(`Error: ${error.response.status} - ${error.response.statusText}`)
            }
        }
    }, 10000)

}).catch(err => {   //catching all the errors that might happend 
    console.log('An error occured while connecting to the DB')
})

//an API route to get videos in a paginated response - a GET request where page and limit are passed as request params
const getVideos = require('./routes/getVideos')
app.use('/getvideos', getVideos)

//an API route to search videos using their title and description - a POST request where title and description are passed as the body of the request
const searchVideos = require('./routes/searchVideo')
app.use('/search', searchVideos)

app.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
})