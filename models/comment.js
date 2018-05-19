const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: String,
  },
  content: {
    type: String,
  },
  vote: {
    type: Number
  },
  timestamps {
    type: true
  }
});

module.exports = mongoose.model('Comment', CommentSchema);