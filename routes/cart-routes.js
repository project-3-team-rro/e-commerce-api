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

router.post('/cart', (req, res, next) => {
  var prodId = req.body.prodId;
  var userId = req.body.userId;
  console.log("BODYYYYYYY: ============", req.body)
  User.findById(userId)
    .then(foundUser => {
      Merchandise.findById(prodId)
        .then(foundMerchandise => {
          foundUser.cart.push(foundMerchandise);
          console.log("user before saving: ", foundUser);
          foundUser.save(err => {
            console.log("user after the save: ", foundUser)

            if (err) {
              console.log("err while saving user in the cart: ", err)
            }
            res.json(foundUser)
          })

        })
        .catch(err => {
          console.log("err while finding merchandise", err)
        })
    })
    .catch(error => {
      console.log("error while finding a user: ", error)
    })
});



module.exports = router