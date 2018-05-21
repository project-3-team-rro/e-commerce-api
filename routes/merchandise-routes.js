const express = require('express');
const router = express.Router();
const Merchandise = require('../models/merchandise')

router.get('/merchandise', (req, res, next) => {
  Merchandise.find()
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.json(err)
    })
});

router.get('/merchandise/:merchandiseID', (req, res, next) => {
  Merchandise.findById(req.params.merchandiseID)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.json(err)
    })
});

module.exports = router