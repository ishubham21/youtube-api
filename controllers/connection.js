//to use the configurations from the dotenv file
const dotenv = require('dotenv')
dotenv.config()

//connecting to the mongoose 
//print connection successful on a successful connection, else log the error
const mongoose = require('mongoose')

module.exports = async () => {
    
    //returning a promise event so that we can ensure that the Youtube API is called only when the databse is connected successfully  
    return mongoose.connect(process.env.DB_CONFIG, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
