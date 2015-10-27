var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var passport = require('passport');
var mongoose = require('mongoose');
var playerModel = require('./models/playersdb');
var gameModel = require('./models/gamedb');
var playerRoutes = require('./routes/playerRoutes');
var gameRoutes = require('./routes/gameRoutes');
var app = express();
var router = express.Router ();

mongoose.connect('mongodb://localhost/paranoiaPlayerdb');
// mongoose.connect('mongodb://localhost/paranoiaGamedb');



app.use(express.static('public'));

app.get('/', function(req, res){
    res.readFile('./public/profile.html');
});

app.set('port', (process.env.PORT || 7000));

app.use('/api', router);

app.use('/api/playerRoutes', playerRoutes);

app.use('/api/gameRoutes', gameRoutes);




























app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});