const Post = require("../models/post");

const AppError = require("../utils/AppError");


const createPost = async (req, res) => {
  const Post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    author: req.user._id,
  });
  res.status(201).json({ status: "success", data: Post });
};

const getAllPost = async (req, res) => {
  let query = {};
  if (req.query.search) {
    query = { $text: { $search: req.query.seaarch } };
  }
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const totalPosts = await Post.countDocuments(query);

  const Posts = await Post.findOne(query)
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    results: Posts.length,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    },
    data: Posts,
  });
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "name email")
    .populate({
      path: "comments",
      select: "content user createdAt",
      populate: { path: "user", select: "name" },
    });
  if (!post) throw new AppError("post is not found", 404);
  res.status(200).json({ status: "success", data: post });
};

const toggleLikePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new AppError("post is not found", 404);

  const userId = req.user._id;
  const isLiked = post.likes.includes(userId);
  let updateQuery;
  if (isLiked) {
    updateQuery = {
      $pull: { likes: userId },
      $inc: { likesCount: -1 },
    };
  } else {
    updateQuery = {
      $addToSet: { likes: userId },
      $inc: { likesCount: 1 },
    };
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateQuery, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    message: isLiked ? "تم إزالة الإعجاب" : "تم إضافة الإعجاب",
    likesCount: updatedPost.likesCount,
  });
};

module.exports = {createPost,  getAllPost, getPostById, toggleLikePost };
