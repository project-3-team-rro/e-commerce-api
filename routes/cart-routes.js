const express = require('express');
const router = express.Router();
const Cart = require('../models/cart')
const User = require('../models/user')
const Merchandise = require('../models/merchandise');


router.get('/user/:id/cart', (req, res, next) => {
  var userId = req.params.id;
  var myCart = [];
  User.findById(userId)
  .then( foundUser => {
    var arrayOfProductIds = foundUser.cart;
    // console.log("array is: ", arrayOfProductIds)
    arrayOfProductIds.forEach(oneId => {
      Merchandise.findById(oneId)
      .then( foundMerchandise => {
        myCart.push(foundMerchandise);
      } )
    })
    setTimeout(function(){
      // console.log("1 is: ", arrayOfProductIds.length )
      // console.log("2 is: ", myCart.length)
      if(arrayOfProductIds.length === myCart.length){
        res.json(myCart)
      }
    },3000)
  } )
});



module.exports = router