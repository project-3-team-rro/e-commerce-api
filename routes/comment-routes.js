const express = require('express');
const router = express.Router();
const Comment = require('../models/comment')
const isLoggedIn = require('./utils/isLoggedIn')


//SHOW ALL COMMENTS
router.get('/comments', (req, res, next) => {
  Comment.find({})
    .populate('_author')
    .exec((err, threads) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(threads);
    });
});


// CREATE NEW COMMENT
router.post('/comments', isLoggedIn, (req, res, next) => {
  // console.log("post create ====================== ", req.user);
  const newComment = new Comment({
    _author: req.user._id,
    content: req.body.content,
    date: req.body.date,
    _merchandise: req.merchandise._id
  });
  newComment.save()
    .then(() => {
      res.json(newComment)
    })
    .catch((err) => {
      res.json(err)
    });
});











module.exports = router;