var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))




 router.route('/:id')

  .post(function(req, res) {

       var player = req.body.players;
       console.log(req.body);


       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
            

          if (err)
              res.send(err);
            
            game.players.push(player);
            game.save();
            
            console.log("New player named " + player + " added to game " + game.gameName);
            res.app.game = game;
      // res.redirect('/completeGame');
      
      res.render('completeGame.ejs', {game : game});
       });
   })

   .get(function(req, res) {
       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
           if (err)
               res.send(err);

           res.json(game.players);
       });
   })

   
   .put(function(req, res) {

       var player = req.body.player;
       


       mongoose.model('Game').findById({
           _id: req.params.id
       }, function(err, game) {
            

        	if (err)
            	res.send(err);
            
            game.players.push(player);
            game.save();
            res.json(game.players);
       });
   })
   

   .delete(function(req, res) {
   	var player = req.body.player;
   	mongoose.model('Game').findById({
   		_id: req.params.id
   	}, function(err, game) {
   		if (err)
   			res.send(err);
   		var index = game.players.indexOf(player);
   		if (index != -1){
   			game.players.splice(index, 1);
   			game.save();
   			res.json({ message: 'Successfully deleted' });

   		} else {
   			res.json({ message: "player not there!"})
   		}

   	});
   });

module.exports = router; 