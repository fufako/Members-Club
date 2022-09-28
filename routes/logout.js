const express = require("express")
const router = express.Router()

/* GET users listing. */
router.get("/", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
})

module.exports = router
