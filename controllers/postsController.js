const Post = require("../models/postModel")

exports.index = function (req, res, next) {
  Post.find().exec(function (err, list_posts) {
    if (err) {
      return next(err)
    }

    res.render("index", {
      user: res.locals.currentUser,
      posts: list_posts,
    })
  })
}
