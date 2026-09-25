const Comment = require("../models/comment");
const AppError = require("../utils/AppError");

const addComment = async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    post: req.params.postId,
    user: req.user._id,
  });
  res.status(200).json({ status: "success", date: comment });
};

const deletedComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) throw new AppError("comment is not found !", 404);

  if (comment.user.toString() !== req.user._id.toString())
    throw new AppError("you are not authorized to delete this comment");
  await comment.deleteOne();
  res.status(204).send();
};
const updateComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new AppError("comment is not found", 404);
  if (
    req.user.role !== "admin" &&
    comment.user.toString() !== req.user._id.toString()
  )
    throw new AppError("you are not authorized to update this comment", 403);
  const editComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      content: req.body.content,
    },
    { new: true },
  );
  res.status(200).json({ message: "success", data: editComment });
};

module.exports = { addComment, deletedComment, updateComment };
