const Video = require('./../models/video')
const router = require('express').Router()
const findVideoById = require('./../controllers/findVideo')

router.get('/', (req, res) => {

    const videoId = req.query.id
    if(!videoId){
        return res.status(400).json({
            error: 'Please pass a valid video identifier, use format http://localhost:8080/search?id=<your_video_id>'
        })
    }
    const videoData = findVideoById(videoId)
    res.status(200).send(videoData)
})

module.exports = router

