0
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  _merchandise: {
    type: Schema.Types.ObjectId,
    ref: 'Merchandise'
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Comment', CommentSchema);