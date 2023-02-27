var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var JSON = require('JSON');

var app = express();
var port = process.env.PORT || 3000;

app.engine('', exphbs.engine({ defaultLayout: null}));

app.use(express.json())

app.use(express.static('public'));

app.get('/', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/public/index.html');
});

const URL = 'http://localhost:3000';

const 