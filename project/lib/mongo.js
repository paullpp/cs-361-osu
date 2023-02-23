const mongoose = require('mongoose')

const mongoURL = `mongodb://mongo:27017/meetdata`

let db = null

exports.getDbInstance = function () {
    db = mongoose.connect(mongoURL, function(err) {
        if (err) {
            console.log(err)
        }
        console.log("connected to db")
    })
    
    return db
}