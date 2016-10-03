var express = require('express');
var request = require('request');
var app = express();

var API_KEY = "c6e06e9d8f8812cecff5b7bc33c60c64";

app.get('/getWeatherInfo', function (req, res) {
  var _query = req.query;
  _query.APPID = API_KEY;
  request.get({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    qs: _query
  }).pipe(res);
});

app.get('/getForecast', function (req, res) {
  var _query = req.query;
  _query.APPID = API_KEY;
  request.get({
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
    qs: _query
  }).pipe(res);
});

app.use(express.static(__dirname + "/build"));

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + process.env.PORT);
});