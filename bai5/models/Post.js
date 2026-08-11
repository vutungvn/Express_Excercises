let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung 1", thumbnailUrl: null },
  { id: 2, title: "Bài viết 2", content: "Nội dung 2", thumbnailUrl: null },
];

const getAll = () => posts;

const findById = (id) => posts.find((post) => post.id === +id);

const create = ({ title, content, thumbnailUrl }) => {
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    thumbnailUrl: thumbnailUrl || null,
  };

  posts.push(newPost);
  return newPost;
};

const deleteById = (id) => {
  const index = posts.findIndex((p) => p.id === +id);

  if (index !== -1) {
    const deletePost = posts[index];
    posts.splice(index, 1);
    return deletePost;
  }

  return null;
};

export default {
  getAll,
  findById,
  create,
  deleteById,
};
