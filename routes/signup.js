const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/userModel")
const passport = require("passport")
passport.use(
  new LocalStrategy((name, password, done) => {
    User.findOne({ name: name }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }
      //   if (user.password !== password) {
      //     return done(null, false, { message: "Incorrect password" })
      //   }
      //   return done(null, user)
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
    })
  })
)
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
router.get("/", function (req, res, next) {
  res.render("signup")
})

router.post("/sign-up", (req, res) => {
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
