const express = require("express")
const router = express.Router()
const LocalStrategy = require("passport-local").Strategy
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
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("login")
})
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
)

module.exports = router
