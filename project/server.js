var fs = require('fs')
var express = require('express')
var exphbs = require('express-handlebars')
var JSON = require('JSON')
//var mysql = require('mysql2')
var data = require('./meet_data.json')

var app = express()
var port = process.env.PORT || 8000

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

// console.log(temp) 

// var con = mysql.createConnection({
//   host: "localhost",
//   username: "root",
//   password: "password",
//   insecureAuth: true
// });

// con.connect(function(err) {
//   if (err) {console.log(err); return};
//   console.log("connected to mysql db")
//   con.query("select * from meets", err, result)
//   console.log(result)
// })

app.engine('', exphbs.engine({ defaultLayout: null}))

app.use(express.json())

app.use(express.static('public'))

app.get('/', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/index.html')
})

app.get('/api/v1/meetdata', function (req, res, next) {
  res.status(200).send(data.Lifters)
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

app.get('*', function (req, res, next) {
  res.status(404)
  next()
})

app.listen(port, function () {
  console.log("== Server listening on port", port)
})