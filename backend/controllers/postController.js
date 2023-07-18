const Post = require("../models/postModel");

module.exports.create_post = async (req, res) => {
  // desctructure the body of the request

  const { author, content } = req.body;

  // # add post to database
  try {
    const post = new Post({
      author,
      content,
    });

    await post.save();

    res.status(200).json({ ...post._doc });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.get_recent_posts = async (req, res) => {
  // fetch 10 recent posts.
  try {
    const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(recentPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
