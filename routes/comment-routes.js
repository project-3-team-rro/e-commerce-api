const express = require('express');
const router = express.Router();
const Comments = require('../models/comment')

router.get('/merchandise', (req, res, next) => {
  Merchandise.find()
    .then(allItems => {
      res.json(allItems);
    })
    .catch(err => {
      res.json(err)
    })
});

module.exports = router;