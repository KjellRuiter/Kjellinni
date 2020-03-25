const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId, // Data store owner is objectid
        required: true,
        ref: 'User' // set up the relationship between task and user
    },
    currentlyMatching:{
        _id: false,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
    },
    matched_history:[{
        _id: false,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        status:{
            type: String,
            enum:['pending', 'liked', 'disliked'],
            required: true
        },
        opened:{
            type: Boolean,
            default: false,
            required: true
        }
    }],
    dislikes:[{
        _id: false,
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }],
    likes:[{
        _id: false,
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }],
});


module.exports = mongoose.model('Matches', schema);
