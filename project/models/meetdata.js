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
    deadlift_3: Number
}), 'meet');

var meets = mongoose.model('meet')
exports.MeetSchema = meets

exports.insertNewLift = async function insertNewLift(lift) {
    const db = getDbInstance()
    const collection = db.collection('meet')

    lift = extractValidFields(lift, MeetSchema)
    const result = await collection.insertOne(lift)
    return result.insertedId
}

exports.getAllLifts = async function getAllLifts() {
    const db = getDbInstance()
    var connection = mongoose.connection
    //const collection = connection.collection('meet')
    const data = await meets.find({})
    return data
}