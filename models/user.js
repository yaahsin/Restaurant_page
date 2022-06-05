// models

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { //name is not required
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // 利用js函式捕捉建立的時間
  }
})

module.exports = mongoose.model('User', userSchema)