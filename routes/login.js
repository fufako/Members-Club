const express = require("express")
const router = express.Router()

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("login")
})
// router.post(
//   "/",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/",
//   })
// )

module.exports = router
