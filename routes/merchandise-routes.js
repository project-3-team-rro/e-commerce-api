const express = require('express');
const router = express.Router();
const Merchandise = require('../models/merchandise')

const Cart = require('../models/cart');
const User = require('../models/user')
const Comment = require('../models/comment')

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======

>>>>>>> da337bb718184fe172f41375334ea43eec22eef3
function checkRoles(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/')
    }
  }
}
<<<<<<< HEAD
>>>>>>> master
=======

>>>>>>> da337bb718184fe172f41375334ea43eec22eef3

router.get('/merchandise', (req, res, next) => {
  Merchandise.find()
    .then(allItems => {
      res.json(allItems);
    })
    .catch(err => {
      res.json(err)
    })
});


// router.get('/cart', () => {
//   console.log("herre")
// })
// console.log('in cart routers')
// router.get('/cart', (req, res, next) => {
//   console.log('caling get')
//   Cart.find()
//     .then(items => {
//       res.json(items);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

router.post('/cart', (req, res, next) => {
  var prodId = req.body.prodId;
  var userId = req.body.userId;
  // console.log("BODYYYYYYY: ============", req.body)
  User.findById(userId)
  .then(foundUser => {
    Merchandise.findById(prodId)
    .then(foundMerchandise => {
      foundUser.cart.push(foundMerchandise);
      console.log("user before saving: ", foundUser);
      foundUser.save( err => {
        console.log("user after the save: ", foundUser)
  
        if(err){
          console.log("err while saving user in the cart: ", err)
        }
        res.json(foundUser)
      } )

    })
    .catch( err => {
      console.log("err while finding merchandise", err)
    })
  })
  .catch( error => {
    console.log("error while finding a user: ", error)
  })
});


router.get('/merchandise/:merchandiseID', (req, res, next) => {
  Merchandise.findById(req.params.merchandiseID)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.json(err)
    })
});

router.post('/merchandise/delete/:deleteID', (req, res, next) => {
  Merchandise.findByIdAndRemove(req.params.deleteID)
    .then(deletedItem => {
      res.json(deletedItem);
    })
    .catch(err => {
      res.json(err)
    })
});

router.post('/merchandise/update/:id', (req, res, next) => {
  Merchandise.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedItem => {
      res.json(updatedItem)
    })
    .catch(err => {
      res.json(err)
    })

})

router.post('/merchandise/create', (req, res, next) => {
  const newMerchandise = new Merchandise({
    name: req.body.name,
    picture: req.body.picture,
    price: req.body.price,
    category: req.body.category,
    new: req.body.new,
    quantity: req.body.quantity,
    description: req.body.description,
    seller: req.user.id,
  });
  newMerchandise.save()
    .then(() => {
      res.json(newMerchandise)
    })
    .catch((err) => {
      res.json(err)
    });
});

module.exports = router