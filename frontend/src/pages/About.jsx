import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const blog = location.state;

  return (
    <div>
      <p>{blog?.title}</p>
      <p>{blog?.content}</p>
    </div>
  );
};

export default About;
