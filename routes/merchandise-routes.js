const express = require('express');
const router = express.Router();
const Merchandise = require('../models/merchandise')
const User = require('../models/user')
const Comment = require('../models/comment')

function checkRoles(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/')
    }
  }
}

router.get('/merchandise', (req, res, next) => {
  Merchandise.find()
    .then(allItems => {
      res.json(allItems);
    })
    .catch(err => {
      res.json(err)
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