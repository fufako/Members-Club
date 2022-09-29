const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/userModel")
const passport = require("passport")
const avatars = [
  "/images/bear.png",
  "/images/chicken.png",
  "/images/dog.png",
  "/images/dog2.png",
  "/images/giraffe.png",
  "/images/puffer-fish.png",
  "/images/rabbit.png",
  "/images/weasel.png",
]
const getRandomInt = () => {
  return Math.floor(Math.random() * 7)
}

router.get("/", function (req, res, next) {
  res.render("signup")
})

router.post("/", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) return next(err)

    const user = new User({
      name: req.body.username,
      password: hashedPassword,
      avatar: avatars[getRandomInt()],
    }).save((err) => {
      if (err) {
        return next(err)
      }
      res.redirect("/")
    })
  })
})

module.exports = router
