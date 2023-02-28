var fs = require('fs')
var express = require('express')
var exphbs = require('express-handlebars')
var data = require('./meet_data.json')
const bodyParser = require('body-parser');
const { connectToDb } = require('./lib/mongo')
const {
  MeetSchema,
  insertNewLift,
  getAllLifts
} = require('./models/meetdata')



var app = express()
var port = 8000

var names = []
var totals = []
var weightclasses = []
for (var i = 0; i < data.Lifters.length; i++) {
  names[i] = data.Lifters[i].name
  totals[i] = [data.Lifters[i].name, data.Lifters[i].total]
  if (!(weightclasses.includes(data.Lifters[i].weightclass))) {
    weightclasses.push(data.Lifters[i].weightclass)
  }
}

app.engine('', exphbs.engine({ defaultLayout: null}))

app.use(express.json())

app.use(express.static('public'))

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/index.html')
})

app.get('/api/v1/meetdata', async function (req, res, next) {
  const meets = await getAllLifts()
  res.status(200).send(meets);
})

app.get('/api/v1/lifters', function (req, res, next) {
  res.status(200).send(names)
})

app.get('/api/v1/totals', function (req, res, next) {
  res.status(200).send(totals)
})

app.get('/api/v1/weightclasses', function (req, res, next) {
  res.status(200).send(weightclasses)
})

app.post('/api/v1/addlifter', async function(req, res, next) {
  await insertNewLift(req.body['name'], req.body['weightclass'], req.body['bench_1'], req.body['bench_2'], req.body['bench_3'], req.body['squat_1'], req.body['squat_2'], req.body['squat_3'], req.body['deadlift_1'], req.body['deadlift_2'], req.body['deadlift_3'], req.body['total'])
  res.sendStatus(201)
})

app.get('*', function (req, res, next) {
  res.status(404)
  next()
})

app.listen(port, function () {
  console.log("== Server listening on port", port)
})