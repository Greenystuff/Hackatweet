var express = require('express');
var router = express.Router();
const Tweet = require('../models/tweets')
const User = require('../models/users')

router.post('/new', (req, res) => {
  if (!req.body.content) {
    res.json({
      result: false,
      error: "Content is empty"
    })
    return;
  }
  User.findOne({ username: req.body.username })
    .then(userFound => {
      if (userFound) {
        const newTweet = new Tweet({
          user: userFound._id,
          content: req.body.content,
          isLiked: false,
          likeNumber: 0,
          date: new Date()
        })
        newTweet.save().then(data => {
          data.user = userFound;
          res.json({
            result: true,
            data: data
          })
        })
      } else {
        res.json({
          result: false,
          error: "User doesn\"t exist"
        })
      }
    })
})

router.get('/all', (req, res) => {
  Tweet.find().populate('user').then(allTweets => {
    res.json({
      result: true,
      allTweets
    })
    console.log(allTweets)
  })
})

router.patch('/like', (req, res) => {
  User.findOne({ username: req.body.username })
    .then(userFound => {
      if (!userFound.likedTweets.includes(req.body.id)) {
        User.updateOne({ username: req.body.username }, { likedTweets: userFound.likedTweets.push(req.body.id) })
          .then((data => {
            Tweet.findById(req.body.id).then(tweet => {
              let newLikedNumber = 0
              newLikedNumber = tweet.likeNumber + 1
              Tweet.updateOne({ _id: req.body.id }, { likeNumber: newLikedNumber }).then(data => {
                res.json({
                  result: true,
                  likeNumber: newLikedNumber
                })
              })
            })
          }))
      } else {
        User.updateOne({ username: req.body.username }, { likedTweets: userFound.likedTweets.map(id => id !== req.body.id) })
          .then((data => {
            Tweet.findById(req.body.id).then(tweet => {
              let newLikedNumber = 0
              newLikedNumber = tweet.likeNumber - 1
              Tweet.updateOne({ _id: req.body.id }, { likeNumber: newLikedNumber }).then(data => {
                res.json({
                  result: true,
                  likeNumber: newLikedNumber
                })
              })
            })
          }))
      }


    })


})

module.exports = router;