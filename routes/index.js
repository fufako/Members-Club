const express = require("express")
const router = express.Router()
const posts_controller = require("../controllers/postsController")

/* GET home page. */
router.get("/", posts_controller.index)
router.get("/member", posts_controller.member)
router.post("/member", posts_controller.member_post)

module.exports = router
