const express = require("express")
const postRouter = express.Router()
const Post = require('../models/post.jsx')

// Get All Posts
postRouter.get("/", (req, res, next) => {
  Post.find((err, posts) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(posts)
  })
})

// Get posts by user id
postRouter.get("/user", (req, res, next) => {
  Post.find({ user: req.auth._id }, (err, posts) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(posts)
  })
})

// Add new Post
postRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id
  req.body.username = req.auth.username
  console.log(req.body)
  // console.log(req.auth)
  const newPost = new Post(req.body)
  newPost.save((err, savedPost) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedPost)
  })
})

// Delete Post
postRouter.delete("/:postId", (req, res, next) => {
  Post.findOneAndDelete(
    { _id: req.params.postId, user: req.auth._id },
    (err, deletedPost) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete post: ${deletedPost}`)
    }
  )
})

// Update Post
postRouter.put("/:postId", (req, res, next) => {
  Post.findOneAndUpdate(
    { _id: req.params.todoId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedPost) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedPost)
    }
  )
})

//Upvote Post
postRouter.put('/upVote/:postId', (req, res, next) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    {
      $addToSet: {likedUsers: req.auth._id},
      $pull: {dislikedUsers: req.auth._id}
    },
    { new: true },
    (err, updatedPost) => {
      if(err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedPost)
    }
  )
})

//Downvote Post
postRouter.put('/downVote/:postId', (req, res, next) => {
  Post.findOneAndUpdate(
      { _id: req.params.postId },
      {
          $addToSet: { dislikedUsers: req.auth._id },
          $pull: { likedUsers: req.auth._id }
      },
      { new: true },
      (err, updatedPost) => {
          if (err) {
              res.status(500)
              return next(err)
          }
          return res.status(201).send(updatedPost)
      }
  )
})

module.exports = postRouter