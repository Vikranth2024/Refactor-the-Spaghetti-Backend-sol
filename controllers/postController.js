const postService = require('../services/postService');

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPublishedPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    if (!title || !authorId) {
      return res.status(400).json({ error: 'title and authorId are required' });
    }
    const result = await postService.createPost({ title, content, authorId });
    if (result.notFound) return res.status(404).json({ error: 'Author not found' });
    res.status(201).json(result.post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const publishPost = async (req, res) => {
  try {
    const post = await postService.publishPost(parseInt(req.params.id));
    res.json({ message: 'Post published', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllPosts, getPostById, createPost, publishPost };
