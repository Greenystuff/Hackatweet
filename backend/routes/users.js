var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const uid2 = require('uid2');
const User = require('../models/users')

router.post('/new', (req, res) => {
  if (!req.body.firstname || !req.body.username || !req.body.password) {
    res.json({
      result: false,
      error: "Field empty or incorrect"
    })
    return;
  }

  User.findOne({ username: req.body.username })
    .then(data => {
      if (data) {
        res.json({
          result: false,
          error: "User already exist"
        })
      } else {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const token = uid2(32);
        const newUser = new User({
          firstname: req.body.firstname,
          username: req.body.username,
          hash,
          token
        })
        newUser.save().then(data => {
          res.json({
            result: true,
            firstname: data.firstname,
            username: data.username,
            token: data.token
          })
        });
      }
    })
})

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      result: false,
      error: "Field empty or incorrect"
    })
    return;
  }

  User.findOne({ username: req.body.username })
    .then(userFound => {
      if (!userFound) {
        res.json({
          result: false,
          error: "User does\'t exist"
        })
      } else {
        if (bcrypt.compareSync(req.body.password, userFound.hash)) {
          const token = uid2(32);
          User.updateOne({ username: req.body.username }, { token }).then(data => {
            res.json({
              result: true,
              firstname: userFound.firstname,
              username: userFound.username,
              token
            });
          })
        } else {
          res.json({ result: false });
        }
      }
    })
})

router.post('/myLikedTweets', (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      res.json({
        result: true,
        liked: user.likedTweets
      })
    })
})

module.exports = router;
