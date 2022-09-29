const express = require("express")
const router = express.Router()
const posts_controller = require("../controllers/postsController")

/* GET home page. */
router.get("/", posts_controller.index)

module.exports = router
