const mongoose = require('mongoose')
const Post = require('./post')

const schema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  posts: [Post]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', schema)
