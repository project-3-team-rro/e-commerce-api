const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  name: {
    type: String
  }
})

module.exports = mongoose.model('Cart', CartSchema);