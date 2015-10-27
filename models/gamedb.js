var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({

    
        name: String,
        moderator: String,
        starts: Date,
        ends: Date,
        arena: String,
        prize: Number
    
})

module.exports = mongoose.model('Games', gameSchema);