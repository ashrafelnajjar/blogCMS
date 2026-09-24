const express = require("express")
const router = express.Router()
const { deletedComment } = require("../controllers/comment")
const auth = require("../middlewares/auth")


router.delete("/:id" , auth , deletedComment)

module.exports = router