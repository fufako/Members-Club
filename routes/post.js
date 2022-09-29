const express = require("express")
const router = express.Router()
const Post = require("../models/postModel")
const { DateTime } = require("luxon")

router.get("/", function (req, res, next) {
  res.render("create", { user: res.locals.currentUser })
})
router.post("/", (req, res) => {
  let date = new Date()
  const post = new Post({
    content: req.body.content,
    author: res.locals.currentUser,
    date: DateTime.fromJSDate(date).toFormat("yyyy-MM-dd, HH:mm"),
  }).save((err) => {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
})

module.exports = router
