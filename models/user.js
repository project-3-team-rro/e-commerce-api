const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Merchandise = require('./merchandise');

const UserSchema = new Schema({
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true
  },
  username: {
    type: String,
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
    },
    street2: String,
    zip: String
  },
  avatar: {
    type: String
  },
  bio: {
    type: String
  },
  rating: {
    type: Number
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: "Merchandise"
  }]
}, {
  usePushEach: true
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('User', UserSchema);