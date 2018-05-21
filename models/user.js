const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  address: {
    state: {
      type: String
    },
    city: {
      type: String
    },
    street: {
      type: String
    }
  },
  avatar: {
    type: String
  },
  bio: {
    type: String
  },
  raiting: {
    type: Number
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('User', UserSchema);