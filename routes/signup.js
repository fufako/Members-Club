const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/userModel")
const passport = require("passport")

router.get("/", function (req, res, next) {
  res.render("signup")
})

router.post("/", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) return next(err)

    const user = new User({
      name: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err)
      }
      res.redirect("/")
      console.log("asfdsdfg")
    })
  })
})
module.exports = router
