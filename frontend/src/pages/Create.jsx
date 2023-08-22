import React, { useState } from "react";
import { useBlogsContext } from "../hooks/useBlogsContext";
import { Link } from "react-router-dom";

const Create = () => {
  const { dispatch } = useBlogsContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = { title, content };

    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setContent("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_BLOG", payload: json });
    }
  };

  return (
    <div className="create">
      <div className="createBlogHeader">
        <h2>Create New Blog</h2>
        <Link to="/">Go Home</Link>
      </div>

      <form className="createBlogForm" onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label>Blog Content:</label>
        <textarea
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          rows="5"
          className={emptyFields.includes("content") ? "error" : ""}
        />

        <button>Add Blog</button>
        {error && <div className="error errorText">{error}</div>}
      </form>
    </div>
  );
};

export default Create;
