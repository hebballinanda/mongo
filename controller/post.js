const {
    getPostsModel,
    addPostsModel,
    updatePostsModel,
    deletePostsModel,
    getPostModel,
  } = require('../models/mongo-db/post');
  
  async function getPostsController(req, res, next) {
    try {
      const posts = await getPostsModel();
      res.status(200).json(posts);
    } catch (err) {
      next(err);
      console.error('Error in getting posts:', err);
    }
  }
  
  async function getPostController(req, res, next) {
    try {
      const post = await getPostModel(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      console.error('Error in getting post:', err);
      res.status(404).json({ error: 'Post not found' });
    }
  }
  
  const addPostsController = async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
  
      const postBody = { title, content };
      const post = await addPostsModel(postBody);
      res.status(201).json(post);
    } catch (err) {
      console.error('Error in adding post:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const updatePostsController = async (req, res) => {
    try {
      const { title, content } = req.body;
      const id = req.params.id;
  
      if (!id) {
        return res.status(400).json({ error: 'Missing ID in request' });
      }
  
      const postBody = { title, content };
      const updatedPost = await updatePostsModel(id, postBody);
  
      res.status(200).json(updatedPost);
    } catch (err) {
      console.error('Error in updating post:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deletePostsController = async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Missing ID in request' });
      }
  
      await deletePostsModel(id);
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.error('Error in deleting post:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    getPostsController,
    getPostController,
    addPostsController,
    updatePostsController,
    deletePostsController,
  };
  