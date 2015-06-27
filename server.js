var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/src',  express.static(__dirname + '/src'));

var fs = require('fs');

// file is included here:
eval(fs.readFileSync('./src/player.js')+'');

var server = app.listen(3000, function () {
  console.log('Server starting on port 3000');
});

app.get('/', function (req, res) {
  res.render('index.html', { player: new Player(), ship: new Ship('sub', 'A1'), board: new Board() });
});