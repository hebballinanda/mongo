const { ObjectId } = require("mongodb");
const { getDb } = require("../../mongo-db");

const getPostsModel = () => {
    const posts = getDb().collection('posts');
    return posts.find().toArray();
};

const getPostModel = (id) => {
    const posts = getDb().collection('posts');
    const post = posts.findOne({_id:new ObjectId(id)})
    console.log(post)
    if(post){
        return post
    }
    throw Error("Post ids doesn't exist in DB")
};

const addPostsModel = async (data) => {
    const posts = getDb().collection('posts');
    const result = await posts.insertOne(data);
    if (result.insertedId) {
        return posts.findOne({ _id: result.insertedId });
    }
    throw new Error('Failed to insert post');
};

const updatePostsModel = async (_id, body) => {
    const posts = getDb().collection('posts');
    const objectId = new ObjectId(_id);

    await posts.updateOne({ '_id': objectId }, { $set: body });

    return await posts.findOne({ '_id': objectId });
};

const deletePostsModel = async (_id) => {
    const posts = getDb().collection('posts');
    const objectId = new ObjectId(_id);
    const post = await posts.find({ _id: objectId }).limit(1).toArray();
    console.log(post)
    if(post.length > 0){
        await posts.deleteOne({ '_id': objectId });
        return await posts.findOne({ '_id': objectId });
    }
    throw Error("Post ids doesn't exist in DB")
};

module.exports = { getPostsModel, addPostsModel, updatePostsModel,deletePostsModel,getPostModel };
