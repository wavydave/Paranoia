var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))

//url/api/blogs
router.route('/')

/* GET All Blogs */
 .get(function(req, res) {
   mongoose.model('Game').find({}, function(err, players){
     if(err){
       return console.log(err);
     } else {
      res.send(players)
     }
   });
 })

 .post(function(req, res){
   var handle = req.body.handle;
   var email= req.body.email;
   var password = req.body.password;
   var status = req.body.status;
   var target = req.body.target;
   var deceased = req.body.deceased;

   mongoose.model('post').create({
     handle: handle,
     email: email,
     password: password,
     status: status,
     target: target,
     deceased: deceased
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