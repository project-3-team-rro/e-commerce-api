const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchandiseSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  quantity: {

    type: Number
    // required: true,
  },
  picture: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  new: {
    type: String
  },
  availability: {
    type: Boolean
  },
  seller: {
    type: String
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


module.exports = mongoose.model('Merchandise', MerchandiseSchema);