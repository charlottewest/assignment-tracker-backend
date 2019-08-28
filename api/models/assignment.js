const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    min: 3
  },
  link: String,
  description: {
    type: String,
    min: 3
  },
  grade: Number,
  total: Number,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = schema
