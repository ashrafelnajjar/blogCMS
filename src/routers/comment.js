const express = require("express");
const router = express.Router();
const {
  addCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
} = require("../validators/comment");
const {
  addComment,
  deletedComment,
  updateComment,
} = require("../controllers/comment");
const auth = require("../middlewares/auth");
const joiValidation = require("../middlewares/joi-validation");

router.delete("/:id", joiValidation(deleteCommentSchema), auth, deletedComment);
router.delete("/:id", joiValidation(updateCommentSchema), auth, updateComment);

module.exports = router;
