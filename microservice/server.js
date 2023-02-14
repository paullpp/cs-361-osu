var express = require('express')
var exphbs = require('express-handlebars')
//var JSON = require('JSON')
var request = require('request');

var app = express()
var port = process.env.PORT || 8000

function mode(arr){
  return arr.sort((a,b) =>
        arr.filter(v => v===a).length
      - arr.filter(v => v===b).length
  ).pop();
}

var options = {
  'method': 'GET',
  'url': 'https://jiujitsu-hub-production.up.railway.app/match_record/all',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  const data = JSON.parse(JSON.parse(response.body));
  console.log(data)
  var wins = 0
  var losses = 0
  var opponents = []
  var submissions = []
  for (var i = 0; i < data.length; i++) {
    //console.log(data[i].won)
    if (data[i].won == true) {
      wins++;
    }
    else {
      losses++;
    }
    opponents.push(data[i].opponent)
    submissions.push(data[i].submission_type)
  }
  console.log("win rate: ", wins/(wins+losses), "%")
  console.log("favorite submission: ", mode(submissions))
  console.log("favorite opponent: ", mode(opponents))

  winrate_json = {"winrate": wins/(wins+losses)}
  submission_json = {"favorite_submission": mode(submissions)}
  opponent_json = {"favorite_opponent": mode(opponents)}
  analytics_json = {"winrate": wins/(wins+losses), "favorite_submission": mode(submissions), "favorite_opponent": mode(opponents)}


  app.engine('', exphbs.engine({ defaultLayout: null}))

  app.use(express.json())

  app.use(express.static('public'))

  app.get('/', function (req, res, next) {
    res.status(200).send()
  })

  app.get('/api/v1/raw', function (req, res, next) {
    res.status(200).send(data)
  })

  app.get('/api/v1/winrate', function (req, res, next) {
    res.status(200).send(winrate_json)
  })

  app.get('/api/v1/submission', function (req, res, next) {
    res.status(200).send(submission_json)
  })

  app.get('/api/v1/opponent', function (req, res, next) {
    res.status(200).send(opponent_json)
  })

  app.get('/api/v1/analytics', function (req, res, next) {
    res.status(200).send(analytics_json)
  })

  app.get('*', function (req, res, next) {
    res.status(404)
    next()
  })

  app.listen(port, function () {
    console.log("== Server listening on port", port)
  })

  
});





