const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, // Data store owner is objectid
        required: true,
        ref: 'User', // set up the relationship between task and user
    },
    artist:{
        type: String,
        required: true
    },
    preview:{
        type: String,
        required: true
    },
    song_name:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Songs', schema)
