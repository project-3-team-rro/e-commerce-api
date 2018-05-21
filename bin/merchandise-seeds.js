const Merchandise = require('../models/merchandise');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/e-commerce-api')

const merchandise = [{
  name: "iPhoneX",

  picture: "https://ss7.vzw.com/is/image/VerizonWireless/iPhoneX-Svr?$png8alpha256$&hei=410",

  price: 900,

  description: "The iPhone X's display is so immersive, the device itself disappears into the experience. And so intelligent it can respond to a tap, your voice, and even a glance. Say hello to the future.",

  category: 'Electronic',

  new: 'New',

  quantity: 10,

  seller: 'Apple',

}];

Merchandise.create(merchandise, (err, items) => {
  if (err) {
    throw (err)
  }
  console.log("Success", items);
  mongoose.connection.close();
})