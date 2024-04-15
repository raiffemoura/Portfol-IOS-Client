import React from "react";
import { Link } from "react-router-dom";
const HomeButtonFeedback = () => {
  return (
    <div className="home-button-feedback">
      <Link to={"/"}>
        <button className="back-btn"> </button>
      </Link>
    </div>
  );
};

export default HomeButtonFeedback;
