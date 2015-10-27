var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({

    
        name: String,
        moderator: String,
        start: Date,
        end: Date,
        arena: String,
        prize: Number
    
})

module.exports = mongoose.model('Game', gameSchema);