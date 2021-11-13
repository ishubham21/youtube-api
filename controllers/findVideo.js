const Video = require('../models/video')

module.exports = async (videoId) => {
    try {
        const video = await Video.findOne({ videoId: videoId })
        return video   //return true if the video is found, else return false
    } catch(error){
        console.log('Error occured while searching for videos')
    }
}