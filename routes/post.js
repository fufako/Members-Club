const express = require("express")
const router = express.Router()
const Post = require("../models/postModel")

router.get("/", function (req, res, next) {
  res.render("create", { user: res.locals.currentUser })
})
router.post("/", (req, res) => {
  const post = new Post({
    content: req.body.content,
    author: res.locals.currentUser,
    date: new Date(),
  }).save((err) => {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
})

module.exports = router
