const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchandiseSchema = new Schema({
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  new: {
    type: String
  },
  quantity: {
    type: Number
  },
  seller: {
    type: String
  },
  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
});

module.exports = mongoose.model('Merchandise', MerchandiseSchema);