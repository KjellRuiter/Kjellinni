const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, // Data store owner is objectid
        required: true,
        ref: 'User', // set up the relationship between task and user
    },
    currentlyMatching: {
        _id: false,
        type: mongoose.Schema.Types.ObjectId
        
    },
    matched_history: [
        {
            _id: false,
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            status: {
                type: String,
                enum: ['pending', 'denied', 'accepted'],
                required: true,
            },
            opened: {
                type: Boolean,
                default: false,
                required: true,
            },
        },
    ],
    accepted: [
        {
            _id: false,
            type: mongoose.Schema.Types.ObjectId
        },
    ],
    denied: [
        {
            _id: false,
            type: mongoose.Schema.Types.ObjectId
        }
    ],
})

module.exports = mongoose.model('Matches', schema)
