const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchandiseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String
  }
  isNew: {
    type: String
  }
  quantity: {
    type: Number
  }
  availability: {
    type: Boolean
  },
  seller: {
    type: String
  },
  timestamps {
    type: true
  }
});

module.exports = mongoose.model('Merchandise', MerchandiseSchema);