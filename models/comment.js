const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: String,
  } /// I THINK THATS WRONG I BELIVE ITS OBJECT.ID
  content: {
    type: String,
  },
  vote: {
    type: Number
  },
  timestamps: {
    type: Date,
  }

});

module.exports = mongoose.model('Comment', CommentSchema);