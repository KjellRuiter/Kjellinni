const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: false },
  photo: { type: String, required: false },
  age: { type: String, required: false },
  hobby: { type: String, required: false },
  intrested: { type: String, required: false },
  createdDate: { type: Date, default: Date.now },
});

// This is not stored in the database its only for mongoose to make a relationship
schema.virtual('matches',{
    ref: 'Matches',
    localField: '_id',
    foreignField: 'owner'
})

// schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
