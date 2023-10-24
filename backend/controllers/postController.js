const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const cloudinary = require("../cloudinary");

// #1 Posts

module.exports.get_posts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author");

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.get_post = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.get_profile_posts = async (req, res) => {
  const { profile_id } = req.params;

  try {
    const profile_posts = await Post.find({ author: profile_id })
      .sort({
        createdAt: -1,
      })
      .populate("author");

    res.status(200).json(profile_posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.create_post = async (req, res) => {
  const { author, content, image } = req.body;

  try {
    if (!image) {
      const postWithtoutImage = new Post({
        author,
        content,
        postImage: {
          public_id: "",
          url: "",
        },
      });

      await postWithtoutImage.save();

      const populatedPost = await postWithtoutImage.populate("author");

      res.status(200).json(populatedPost);
    }

    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "odin_book_post_images",
      });

      const postWithImage = new Post({
        author,
        content,
        postImage: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      await postWithImage.save();

      const populatedPost = await postWithImage.populate("author");

      res.status(200).json(populatedPost);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.delete_post = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted_post = await Post.findByIdAndDelete(id);
    await Comment.deleteMany({ id });

    res.status(200).json(deleted_post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.update_post_likes = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  let userMatch = false;
  let filteredPostLikes = [];

  const post = await Post.findById(id);

  const checkUserIdExistsInPostLikesArray = () => {
    const postLikes = post.usersLikes;
    postLikes.map((postLike) => {
      if (postLike == user_id) {
        userMatch = true;
        filteredPostLikes = postLikes.filter(
          (postLike) => postLike !== user_id
        );
      }
    });
  };

  checkUserIdExistsInPostLikesArray();

  try {
    if (!userMatch) {
      const postLikes = await Post.findByIdAndUpdate(
        id,
        {
          $push: { usersLikes: user_id },
        },
        { new: true }
      );

      res.status(200).json(postLikes);
    } else {
      const postLikes = await Post.findByIdAndUpdate(
        id,
        {
          $set: { usersLikes: filteredPostLikes },
        },
        { new: true }
      );

      res.json(postLikes);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// #2 Posts Comments
module.exports.fetch_post_comments = async (req, res) => {
  const { post_id } = req.params;

  try {
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

module.exports.add_post_comment = async (req, res) => {
  const { post_id } = req.params;
  const { author, content } = req.body;

  try {
    const comment = new Comment({
      author,
      content,
      post_id,
    });

    await comment.save();

    const addedComment = await comment.populate("author");

    res.status(200).json(addedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.update_post_comment = async (req, res) => {
  const { comment_id } = req.params;
  const { updated_comment_content } = req.body;

  try {
    const updated_post_comment = await Comment.findByIdAndUpdate(
      comment_id,
      { $set: { content: updated_comment_content } },
      { new: true }
    ).populate("author");

    res.status(200).json(updated_post_comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.delete_post_comment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    await Comment.findByIdAndDelete(comment_id);

    res.status(200).json(comment_id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
