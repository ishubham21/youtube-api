const Video = require('../models/video')

module.exports = async ({ title, description, videoId, thumbnails, publishedOn }) => {
    const video = new Video({
        title,
        publishedOn,
        description,
        thumbnails,
        videoId
    })

    //trying to save the video in the database and return an error if found
    try {
        const savedVideo = await video.save()
        console.log(savedVideo)
    } catch (error) {
        console.error('An error occurred while adding to the database')
    }
}