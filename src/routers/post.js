const express = require("express")
const router = express.Router()

const {createPost,  getAllPost, getPostById, toggleLikePost } = require("../controllers/post")
const { deletedComment, addComment } = require("../controllers/comment")
const auth = require("../middlewares/auth")



router.post("/:postId/comments" ,auth ,addComment )

router.get("/", getAllPost)
router.post("/",auth ,createPost )
router.get("/:id",getPostById)
router.patch("/:id/like",auth,toggleLikePost)

module.exports = router