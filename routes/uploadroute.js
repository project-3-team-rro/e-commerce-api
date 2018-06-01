const express = require('express');
const router  = express.Router();
const merchandise = require('../models/merchandise');
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
  const newRental = new Listing({
  
    picture: `/images/${req.file.filename}`,
    listingOwner: req.user._id
  });
  newRental.save()
  .then( () => {

    // console.log("Saved in DB: ", newRental)
    res.redirect('/')
  } )
  .catch( error => {
    console.log("Error while creating listing: ", error);
  } )
})





module.exports = router;
 