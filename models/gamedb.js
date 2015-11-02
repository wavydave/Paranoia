var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({

    
        gameName: String,
        moderator: String,
        startTime: String,
        endTime: String,
        location: String
    
})

module.exports = mongoose.model('Game', gameSchema);