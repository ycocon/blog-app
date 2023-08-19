import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const Home = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blogs");
      const json = await response.json();

      if (response.ok) {
        setBlogs(json);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="home">
      <div className="blogHeader">
        <h2>Posts</h2>
        <Link to="/create">
          <AiOutlinePlus size={12} />
          Add New
        </Link>
      </div>
      <div className="blogs">
        {blogs &&
          blogs.map((blog) => (
            <div className="blogContent" key={blog._id}>
              <Link to="/about" state={blog} className="blogTitle">
                {blog.title}
                <BsArrowUpRight size={12} />
              </Link>

              <div className="buttons">
                <Link to="/about" state={blog} className="edit">
                  Edit
                </Link>

                <a href="#" className="delete">
                  Delete
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
