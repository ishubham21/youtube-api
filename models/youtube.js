const mongoose = require('mongoose')

//creating a schema for our mongoDB database
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 6,
        max: 1024,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        min: 6,
        required: true
    },
    publishedOn: {
        type: Date,
        required: true
    },
    thumbnails: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('Video', videoSchema)