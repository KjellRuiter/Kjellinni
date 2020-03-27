const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
mongoose.Promise = global.Promise

module.exports = {
  User: require('../database/models/user'),
}
