import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE

export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const { filename } = req.file;

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: filename,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    // status code 202 is when something is created
    res.status(201).json(post);
  } catch (error) {
    // status code 409 is when failed to create
    res.status(409).json({ message: error.message });
  }
};

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    // status code 200 is when something is found
    res.status(200).json(post);
  } catch (error) {
    // status code 404 is when something doesn't extis
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, {new: true});
    res.status(200).json(updatedPost);
  } catch (error) {
    es.status(404).json({ message: error.message });
  }
}
