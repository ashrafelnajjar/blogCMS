const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPost,
  getPostById,
  toggleLikePost,
  updatePost,
  deletePost,
} = require("../controllers/post");

const auth = require("../middlewares/auth");
const joiValidation = require("../middlewares/joi-validation");
const {
  createPostSchema,
  deleteORgetORtoggleLikePostSchema,
  updatePostSchema,
} = require("../validators/post");
const { addCommentSchema } = require("../validators/comment");
const { addComment } = require("../controllers/comment");

//comment
router.post(
  "/:postId/comments",
  joiValidation(addCommentSchema),
  auth,
  addComment,
);

//post
router.get("/", getAllPost);
router.post("/", auth, joiValidation(createPostSchema), createPost);

router.patch("/:id", auth, joiValidation(updatePostSchema), updatePost);
router.delete(
  "/:id",
  auth,
  joiValidation(deleteORgetORtoggleLikePostSchema),
  deletePost,
);
router.get(
  "/:id",
  joiValidation(deleteORgetORtoggleLikePostSchema),
  getPostById,
);
router.patch(
  "/:id/like",
  auth,
  joiValidation(deleteORgetORtoggleLikePostSchema),
  toggleLikePost,
);

module.exports = router;
