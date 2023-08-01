const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

module.exports.create_post = async (req, res) => {
  // desctructure the body of the request

  const { author, content } = req.body;

  // add post to database
  try {
    const post = new Post({
      author,
      content,
    });

    await post.save();

    const populatePost = await post.populate("author");

    res.status(200).json(populatePost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.fetch_recent_posts = async (req, res) => {
  const { user_and_friends_ids } = req.body;

  try {
    // fetch 10 recent posts.
    const recentPosts = await Post.find({
      author: { $in: user_and_friends_ids },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author");

    res.status(200).json(recentPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.get_post = async (req, res) => {
  const { post_id } = req.params;

  // find post
  const post = await Post.findById(post_id);

  res.status(200).json(post);
};

module.exports.get_user_posts = async (req, res) => {
  const { user_id } = req.params;

  try {
    // find user posts
    const userPosts = await Post.find({ author: user_id })
      .sort({
        createdAt: -1,
      })
      .populate("author");

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.create_comment = async (req, res) => {
  // desctrure the body of the request
  const { author, content, post_id } = req.body;
  try {
    // add comment to database
    const comment = new Comment({
      author,
      content,
      post_id,
    });

    await comment.save();

    const populateComment = await comment.populate("author");

    res.status(200).json(populateComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.fetch_post_comments = async (req, res) => {
  // desctructure the body of the request
  const { post_id } = req.body;

  try {
    // fetch post comments
    const postComments = await Comment.find({
      post_id,
    })
      .sort({ createdAt: -1 })
      .populate("author");

    res.status(200).json(postComments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.update_post_likes = async (req, res) => {
  // descructure the ID of the post from the request body
  const { post_id, user_id } = req.body;

  let userMatch = false;
  let filteredPostLikes = [];

  // check if user id exists in the post likes array

  const post = await Post.findById(post_id);

  const postLikes = post.usersLikes;
  postLikes.map((postLike) => {
    if (postLike == user_id) {
      userMatch = true;
      filteredPostLikes = postLikes.filter((postLike) => postLike !== user_id);
    }
  });

  // push the user_id to the post likes array if the user does not already exist
  if (!userMatch) {
    // update the post likes array
    const postLikes = await Post.findByIdAndUpdate(
      post_id,
      {
        $push: { usersLikes: user_id },
      },
      { new: true }
    );

    res.json(postLikes);
  } else {
    // filter out the user_id from the post likes array if the user already exists
    const postLikes = await Post.findByIdAndUpdate(
      post_id,
      {
        $set: { usersLikes: filteredPostLikes },
      },
      { new: true }
    );

    res.json(postLikes);
  }
};
