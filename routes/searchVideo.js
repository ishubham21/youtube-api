const Video = require('./../models/video')
const router = require('express').Router()

router.post('/', async (req, res) => {

    const { title, description } = req.body
    console.log(req.body)

    //return an error if no video title is found
    if (!title) {
        return res.status(400).json({
            error: 'No titile found for the request body'
        })
    }

    try {
        //our query that would be passed to the database
        const videoData = await Video.findOne({ title: title })
        res.status(200).send(videoData)
    } catch (error) {   //responding with 500 in case of any error
        return res.status(500).json({
            error: "It's an error from our side",
            data: error
        })
    }

    //sending the video data as a response
    res.send(videoData)
})

module.exports = router

