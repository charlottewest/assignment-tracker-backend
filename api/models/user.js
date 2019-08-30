const mongoose = require('mongoose')
const Assignment = require('./assignment')

const schema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    match: /^\w+@\w+\.[a-z]*$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  admin: {
    type: Boolean,
    default: false
  },
  assignments: [Assignment]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', schema)
