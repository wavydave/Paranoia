var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
    
        handle: String,
        email: String,
        password: String,
        status: Boolean,
        deceased: Boolean,
        target: String

    
})

module.exports = mongoose.model('Player', playerSchema);