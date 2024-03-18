const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.jsx')
const jwt = require('jsonwebtoken')


//POST a new comment
commentRouter.post('/:postId', (req, res, next) => {
//   req.body.post = req.params.postId; 
const { postId } = req.params;
const { user, text } = req.body;

  const newComment = new Comment({
    post: postId,
    user,
    text
  });
    
  newComment.save((err, savedComment) => {
      if (err) {
          res.status(500);
          return next(err);
      }
      Comment.populate(savedComment, { path: 'user', select: '-password' }, (populateErr, populatedComment) => {
        if (populateErr) {
          res.status(500);
          return next(populateErr);
        }
        return res.status(201).send(populatedComment);
        })
    })
});

//GET all comments
commentRouter.get('/', (req, res, next) => {
    Comment.find({ user: req.auth._id })
    .populate('user', '-password')
    .exec((err, comments) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(comments)
    })
})

//DELETE a given comment
commentRouter.delete("/id", (req, res, next) => {
    Comment.findOneAndDelete(
      { _id: req.params.postId, user: req.auth._id },
      (err, deletedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted comment: ${deletedComment}`)
      }
    )
  })


module.exports = commentRouter