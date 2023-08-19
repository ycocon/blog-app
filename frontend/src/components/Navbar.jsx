import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="Container">
        <Link to="/">
          <h1>Blog App</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
