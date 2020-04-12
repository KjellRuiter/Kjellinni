const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            validate(values){
                if(values.length >2){
                    throw new Error('Cant have more than 2 users in one chatroom')
                }
            }
        }
    ],
    chat_history: [
        {
            _id: false,
            user_sended: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            created_at:{
                type: Date,
                default: new Date().now()
            },
            read: {
                type: Boolean,
                default: false,
                required: true,
            },
        },
    ],
})

module.exports = mongoose.model('Chat', schema)
