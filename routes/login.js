const express = require("express")
const router = express.Router()
const auth_controller = require("../controllers/authController")

router.get("/", function (req, res, next) {
  res.render("login")
})
router.post("/", auth_controller.login_post)

module.exports = router
