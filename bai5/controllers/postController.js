import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import AppError from "../utils/AppError.js";

export const getPosts = (req, res, next) => {
  try {
    const posts = Post.getAll();

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = (req, res, next) => {
  try {
    const { id } = req.params;
    const post = Post.findById(id);

    if (!post) {
      return next(new AppError("Không tìm thấy bài viết", 404));
    }

    // Lấy danh sách các comments thuộc bài posts đó
    const comments = Comment.findByPostId(id);

    return res.status(200).json({
      success: true,
      data: {
        ...post,
        comments,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return next(new AppError("Vui lòng nhập đầy đủ title và content", 400));
    }

    const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = Post.create({ title, content, thumbnailUrl });

    return res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePostById = (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = Post.deleteById(id);

    if (!deletedPost) {
      return next(new AppError("Không tìm thấy bài viết để xóa", 404));
    }

    // Tự động xóa comments khi xóa bài posts đó
    const deletedCommentsCount = Comment.deleteByPostId(id);

    return res.status(200).json({
      success: true,
      message: `Đã xóa bài viết và ${deletedCommentsCount} bình luận liên quan`,
    });
  } catch (error) {
    next(error);
  }
};
