var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))
//url/api/blogs
router.route('/')

/* GET All Blogs */
 .get(function(req, res) {
   mongoose.model('Game').find({}, function(err, game){
     if(err){
       return console.log(err);
     } else {
      res.send(game)
     }
   });
 })

 .post(function(req, res){
 var name = req.body.name;
 var moderator = req.body.moderator;
 var start = req.body.start;
 var end = req.body.end;
 var arena = req.body.arena;
 var prize = req.body.prize;

   mongoose.model('post').create({
   name: name,
   moderator: moderator,
   start: start,
   end: end,
   arena: arena,
   prize: prize
   }, function(err, jam){
     if(err){
       res.send("houston we have a problem")
     } else{
       console.log("New Agent named " + jam + "created!");
       res.send(player);
       
     }
   });
 });

//url/api/blogs/4353453634
 router.route('/:id')
   .get(function(req, res) {
       mongoose.model('post').findById({
           _id: req.params.id
       }, function(err, player) {
           if (err)
               res.send(err);

           res.json(player);
       });
   })

   // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:id)
   // .put(function(req, res) {

   //     mongoose.model('Blog').findById({
   //         _id: req.params.id
   //     }, function(err, blog) {
   //       blog.title = req.body.title;
   //       blog.body = req.body.body;
   //         if (err)
   //             res.send(err);

   //         blog.save();
   //         res.json(blog)
   //     });
   // })
   // delete the bear with this id (accessed at DELETE http://localhost:8080/api/blogs/:id)

   .delete(function(req, res) {
       mongoose.model('post').remove({
           _id: req.params.id
       }, function(err, player) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
   });

module.exports = router;