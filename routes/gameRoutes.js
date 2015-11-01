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
      res.send(games)
     }
   });
 })


 .post(function(req, res){
        var name = req.body.name;
        var moderator= req.body.moderator;
        var start= req.body.start;
        var end= req.body.end;
        var arena= req.body.arena;
        var prize= req.body.prize;

   mongoose.model('Game').create({
     name: name,
     moderator: moderator,
     start: start,
     end: end,
     arena: arena,
     prize: prize
   }, function(err, game){
     if(err){
       res.send("houston we have a problem")
     } else{
       console.log("New Game " + game.name + " created!");
       res.send(game);
       
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

        var name = req.body.name;
        var moderator=req.body.moderator;
        var start=req.body.start;
        var end=req.body.end;
        var arena=req.body.arena;
        var prize=req.body.prize;

       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
            

           if (err)
               res.send(err);
              
            game.name = name;
            game.moderator= moderator;
            game.start= start;
            game.end= end;
            game.arena= arena;
            game.prize= prize;

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