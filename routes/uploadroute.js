const express = require('express');
const router  = express.Router();
const Merchandise = require('../models/merchandise');
const multer = require('multer');
const path = require('path');
const myUploader = multer({
  dest:('./public/uploads/')
});


/* GET dashboard with the create form */
router.get('/upload/create', (req, res, next) => {
  res.render('upload');
});

// post route to create listing
router.post('/upload', myUploader.single('picture'), (req, res, next) => {
  console.log(req.body);
  const merchphoto = new Merchandise({
    price: req.body.price,
  name:req.body.name,
  description: req.body.description,
  category: req.body.category,
  quantity: req.body.quantity,
  new: req.body.new,
  availability: req.body.availability,
  seller: req.body.seller,
  picture: `/images/${req.file.filename}`
  });

  console.log(merchphoto);  

  merchphoto.save()
  .then( () => {

    // console.log("Saved in DB: ", newRental)
    res.redirect('/')
  } )
  .catch( error => {
    console.log("Error while creating listing: ", error);
  } )
})





module.exports = router;
 