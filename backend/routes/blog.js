const express = require("express");
const {
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/", getBlog);

// POST new blog
router.post("/", createBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

// UPDATE a blog
router.patch("/:id", updateBlog);

module.exports = router;
