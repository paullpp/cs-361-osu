const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const { getDbInstance } = require('../lib/mongo')
var Schema = mongoose.Schema

mongoose.model('meet', new Schema ({
    name: String,
    weightclass: Number,
    bench_1: Number,
    bench_2: Number,
    bench_3: Number,
    squat_1: Number,
    squat_2: Number,
    squat_3: Number,
    deadlift_1: Number,
    deadlift_2: Number,
    deadlift_3: Number,
    total: Number
}), 'meet');

var Meets = mongoose.model('meet')
exports.MeetSchema = Meets

exports.insertNewLift = async function insertNewLift(name, 
                                                    weightclass, 
                                                    bench_1, 
                                                    bench_2, 
                                                    bench_3, 
                                                    squat_1, 
                                                    squat_2, 
                                                    squat_3, 
                                                    deadlift_1, 
                                                    deadlift_2,
                                                    deadlift_3,
                                                    total) {
    const db = getDbInstance()
    const data = await new meets({name: name,
                            weightclass: weightclass,
                            bench_1: bench_1,
                            bench_2: bench_2,
                            bench_3: bench_3,
                            squat_1: squat_1,
                            squat_2: squat_2,
                            squat_3: squat_3,
                            deadlift_1: deadlift_1,
                            deadlift_2: deadlift_2,
                            deadlift_3: deadlift_3,
                            total: total})
}

exports.getAllLifts = async function getAllLifts() {
    const db = getDbInstance()
    var connection = mongoose.connection
    //const collection = connection.collection('meet')
    const data = await Meets.find({})
    return data
}