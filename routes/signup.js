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
  res.render("signup", { exists: false, length: true, pass_length: true })
})

router.post("/", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) return next(err)

    User.exists({ name: req.body.username }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        if (result) {
          res.render("signup", {
            exists: true,
            length: true,
            pass_length: true,
          })
        } else if (
          req.body.username.trim().length < 5 &&
          req.body.password.trim().length < 5
        ) {
          res.render("signup", {
            length: false,
            exists: false,
            pass_length: false,
          })
        } else if (
          req.body.password.trim().length < 5 &&
          req.body.username.trim().length > 5
        ) {
          res.render("signup", {
            pass_length: false,
            exists: false,
            length: true,
          })
        } else if (
          req.body.password.trim().length > 5 &&
          req.body.username.trim().length < 5
        ) {
          res.render("signup", {
            pass_length: true,
            exists: false,
            length: false,
          })
        } else {
          const user = new User({
            name: req.body.username,
            password: hashedPassword,
            status: "User",
            avatar: avatars[getRandomInt()],
          }).save((err) => {
            if (err) {
              return next(err)
            }
            res.redirect("/login")
          })
        }
      }
    })
  })
})

module.exports = router
