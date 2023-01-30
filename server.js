var fs = require('fs')
var express = require('express')
var exphbs = require('express-handlebars')

var app = express()
var port = process.env.PORT || 8000

app.engine('', exphbs.engine({ defaultLayout: null}))

app.use(express.json())

app.use(express.static('public'))

app.get('/', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/index.html')
})

app.get('*', function (req, res, next) {
  res.status(404)
  next()
})

app.listen(port, function () {
  console.log("== Server listening on port", port)
})