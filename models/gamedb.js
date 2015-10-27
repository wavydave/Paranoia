var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({

    
        name: String,
        moderator: String,
        start: String,
        end:String,
        arena: String,
        prize: String
    
})

module.exports = mongoose.model('Game', gameSchema);