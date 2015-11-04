var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var passport = require('passport');
var app = express();
var router = express.Router ();
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

require('./config/passport')(passport); // pass passport for configuration
var mongoose = require('mongoose');
var playerModel = require('./models/playersdb');
var gameModel = require('./models/gamedb');
var userModel = require('./models/user');
var playerRoutes = require('./routes/playerRoutes');
var gameRoutes = require('./routes/gameRoutes');
var gamePlayer = require('./routes/gamePlayer');




// mongoose.connect('mongodb://localhost/paranoiaPlayerdb');
mongoose.connect('mongodb://localhost/paranoiaGamedb');

 // load routes & pass in app & fully configed passport

app.use(express.static('public'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/userRoutes.js')(app, passport);



app.set('port', (process.env.PORT || 7000));

app.use('/api', router);

app.use('/api/playerRoutes', playerRoutes);

app.use('/api/gameRoutes', gameRoutes);

app.use('/api/gamePlayer', gamePlayer);









app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});