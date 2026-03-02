const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    turf:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"turf"
    },
    poster:{
            type:String
    },

    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    Instructions: {
        type: String,
    },
    level: {
        type: String
    }
})
const gameModel = mongoose.model('games', gameSchema);
module.exports = gameModel