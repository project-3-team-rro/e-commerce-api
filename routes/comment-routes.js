const express = require('express');
const router = express.Router();
const Comment = require('../models/comment')
const isLoggedIn = require('./utils/isLoggedIn')

router.get('/comments', (req, res, next) => {
  Comment.find()
    .then(commentList => {
      res.json(commentList)
    }).catch(err => {
      res.json(err)
    })
});


// CREATE NEW COMMENT
router.post('/comments', isLoggedIn, (req, res, next) => {
  // console.log("post create ====================== ", req.user);
  const newComment = new Comment({
    _author: req.user.username,
    content: req.body.content,
    date: req.body.date,
    // _merchandise: req.merchandise.name
  });
  newComment.save()
    .then(() => {
      res.json(newComment)
    })
    .catch((err) => {
      res.json(err)
    });
});

















// // CREATE NEW COMMENT
// router.post('/comments', isLoggedIn, (req, res, next) => {
//   // console.log("post create ====================== ", req.user);
//   const newComment = new Comment({
//     _author: req.user.username,
//     content: req.body.content,
//     date: req.body.date,
//     // _merchandise: req.merchandise._id
//   });
//   newComment.save()
//   Merchandise.FindByID(req.params.id)
//     .then((merchandiseFromDB) => {
//       merchandiseFromDB.comment.shift(newComment)
//       merchandiseFromDB.save()
//         .then(() => {
//           res.json(newComment)
//         })
//     })
//     .catch((err) => {
//       res.json(err)
//     });
// });

// // CREATE NEW COMMENT
// router.post('/comments/:id', isLoggedIn, (req, res, next) => {
//   // console.log("post create ====================== ", req.user);
//   const newComment = new Comment({
//     _author: req.user.username,
//     content: req.body.content,
//     date: req.body.date,
//     // _merchandise: req.merchandise._id
//   });
//   newComment.save()
//     .then((newComment) => {
//       res.json(newComment)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   Merchandise.FindByID(req.params.id)
//     .then((merchandiseFromDB) => {
//       merchandiseFromDB.comment.shift(newComment)
//       merchandiseFromDB.save()
//         .then(() => {
//           res.json(newComment)
//         })
//     })
//     .catch((err) => {
//       res.json(err)
//     });
// });









module.exports = router;