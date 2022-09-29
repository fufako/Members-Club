const Post = require("../models/postModel")
const User = require("../models/userModel")

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

exports.member = function (req, res, next) {
  res.render("member", { user: res.locals.currentUser })
}
exports.member_post = function (req, res, next) {
  if (req.body.password != process.env.MEMBER_PASS) {
  } else {
    User.findOne({ _id: res.locals.currentUser._id }, (err, user) => {
      user.status = "member"
      user.save()
    })
    res.redirect("/")
  }
}
