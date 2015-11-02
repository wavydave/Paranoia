var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))


// /api/gameRoutes/
router.route('/')

/* GET All Blogs */
 .get(function(req, res) {
   mongoose.model('Game').find({}, function(err, games){
     if(err){
       return console.log(err);
     } else {
      res.redirect('/profile');
     }
   });
 })


 .post(function(req, res){
        var gameName = req.body.gameName;
        var moderator= req.body.moderator;
        var startTime= req.body.startTime;
        var endTime= req.body.endTime;
        var location= req.body.location;

   mongoose.model('Game').create({
     gameName: gameName,
     moderator: moderator,
     startTime: startTime,
     endTime: endTime,
     location: location,
     
   }, function(err, game){
     if(err){
       res.send("houston we have a problem")
     } else{
      console.log("New game named " + gameName + "created!");
      res.redirect('/profile');
       
     }
   });
 });


 router.route('/:id')


   .get(function(req, res) {
       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
           if (err)
               res.send(err);

           res.json(game);
       });
   })

   
   .put(function(req, res) {

        var gameName = req.body.gameName;
        var moderator=req.body.moderator;
        var startTime=req.body.startTime;
        var endTime=req.body.endTime;
        var location=req.body.location;

       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
            

           if (err)
               res.send(err);
              
            game.gameName = gameName;
            game.moderator= moderator;
            game.startTime= startTime;
            game.endTime= endTime;
            game.location= location;

           game.save();
           res.json(game);
       });
   })
   

   .delete(function(req, res) {
       mongoose.model('Game').remove({
           _id: req.params.id
       }, function(err, game) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
   });

module.exports = router; 