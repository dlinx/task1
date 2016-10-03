var express = require('express');
var app = express();
app.get('/getAPIKey', function (req, res) {
  res.send('c6e06e9d8f8812cecff5b7bc33c60c64');
})
app.use(express.static(__dirname + "/build"));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});