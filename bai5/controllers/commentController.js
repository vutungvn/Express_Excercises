import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import AppError from "../utils/AppError.js";

export const createComment = (req, res, next) => {
  try {
    const { postId, content } = req.body;

    if (!postId || !content) {
      return next(new AppError("Vui lòng nhập đầy đủ postId và content", 400));
    }

    const postExists = Post.findById(postId);
    if (!postExists) {
      return next(new AppError("Không tìm thấy bài viết để bình luận", 404));
    }

    const newComment = Comment.create({ postId, content });

    return res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};
