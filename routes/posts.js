const { getPostsController, addPostsController,updatePostsController, deletePostsController,getPostController } = require("../controller/post");

const express = require('express');
const postRoutes = express.Router();

postRoutes.get('/',getPostsController);
postRoutes.get('/:id',getPostController);
postRoutes.post('/',addPostsController);
postRoutes.put('/:id',updatePostsController);
postRoutes.delete('/:id',deletePostsController);

module.exports = postRoutes