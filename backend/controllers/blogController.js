const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// GET ALL BLOG
const getBlog = async (req, res) => {
  const blog = await Blog.find({}).sort({ createdAt: -1 });

  res.status(200).json(blog);
};

// CREATE A BLOG
const createBlog = async (req, res) => {
  const { title, content } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!content) {
    emptyFields.push("content");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const blog = await Blog.create({ title, content });
    res.status(200).json(blog);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// UPDATE A BLOG
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }

  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!blog) {
    return res.status(400).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

// DELETE A BLOG
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(400).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

module.exports = {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
