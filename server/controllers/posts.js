import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';

export const getPosts = async (req, res,next) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({message : error.message});
  }
};

export const createPost = async (req, res,next) => {
  const post = req.body;

  let newPost = new PostMessage({...post,creator: req.userId,createdAt: new Date().toISOString()});

  try {
    await newPost.save();
    await res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message : error.message});
  }
}

export const updatePost = async (req, res, next) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.send(404).send("No post with that ID");
  
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req, res, next) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.send(404).send("No post with that ID");
  
  await PostMessage.findByIdAndDelete(_id);
  
  res.json({ message: "Post deleted successfully" });
}

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.send(404).send("No post with that ID");

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    // like
    post.likes.push(req.userId);
  }
  else {
    //dislike
    post.likes = post.likes.filter((id) => id !== String(req.userId));
    
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  
  res.json(updatedPost);
  
}