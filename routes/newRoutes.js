var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('../models/user');
router.use(bodyParser.urlencoded({ extended: true }))

router.route('/')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var user = new User();      // create a new instance of the Bear model
        user.email = req.body.email;  // set the bears name (comes from the request)
    	user.password = req.body.password;

        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            console.log("New user added " + user.email + " joined the game!");
            res.json({ message: 'User created!' });
        });
        
    })
/* GET All Blogs */
 .get(function(req, res) {
   mongoose.model('User').find({}, function(err, players){
     if(err){
       return console.log(err);
     } else {
      res.send(players)
     }
   });
 })


router.route('/:_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
 .get(function(req, res) {
     User.findById(req.params._id, function(err, user) {
         if (err)
             res.send(err);
         res.json(user);
     });
 });

 module.exports = router; 