let comments = [
  { id: 1, postId: 1, content: "Bình luận 1 bài 1" },
  { id: 2, postId: 1, content: "Bình luận 2 bài 1" },
  { id: 3, postId: 2, content: "Bình luận bài 2" },
];

const findByPostId = (postId) =>
  comments.filter((cmt) => cmt.postId === +postId);

const create = ({ postId, content }) => {
  const newComment = {
    id: comments.length + 1,
    postId: Number(postId),
    content,
  };
  comments.push(newComment);
  return newComment;
};

const deleteByPostId = (postId) => {
  // Lấy ra danh sách tất cả bài comments
  const initialLength = comments.length;
  // Lọc ra danh sách các bài comments không thuộc postId => không bị xóa
  comments = comments.filter((c) => c.postId !== Number(postId));
  // Số lượng comment đã xóa
  return initialLength - comments.length;
};

export default {
  findByPostId,
  create,
  deleteByPostId,
};
