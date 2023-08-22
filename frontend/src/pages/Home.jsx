import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// icons
import { BsArrowUpRight } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
// custom hook
import { useBlogsContext } from "../hooks/useBlogsContext";

const Home = () => {
  const { blogs, dispatch } = useBlogsContext();

  const handleClick = async (id) => {
    const response = await fetch("/api/blogs/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BLOG", payload: json });
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blogs");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BLOGS", payload: json });
      }
    };

    fetchBlogs();
  }, [dispatch]);

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

                <a
                  href="#"
                  className="delete"
                  onClick={() => {
                    handleClick(blog._id);
                  }}
                >
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
