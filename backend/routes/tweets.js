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
  })
})

module.exports = router;