const router = require('express').Router()
const Videos = require('../models/video')

router.get('/', async (req, res) => {
    
    //extracting the query parameters from the request
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)

    //return first 50 entries if no query parameters are passed in the URL
    if(!page || !limit){
        page = 1
        limit = 50
    }

    try{
        
        const skip = (page - 1) * limit     //calculating the number of responses to be skipped 
        const videos = await Videos.find({})    //querying the database to paginate the API
                                   .sort({publishedOn: -1})
                                   .limit(limit)
                                   .skip(skip)
                                   .exec()
        return res.status(200).send(videos)

    }catch(error){
        
        return res.status(500).json({
            error: 'Something broke at our end.'
        })
    
    }

})

module.exports = router