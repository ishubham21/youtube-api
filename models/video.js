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

//though in mongoDB, indexing is already done based on the _id field, but I'm still adding an index here
//indexing the database based on videoId in the ascending order
videoSchema.index({ videoId: 1 })
module.exports = mongoose.model('Video', videoSchema)