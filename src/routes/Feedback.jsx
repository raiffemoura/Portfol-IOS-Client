import React from "react";
import HeaderBlack from "../components/HeaderBlack";
import "../styles/feedback.css";
import Feedbacks from "../components/feedback/Feedbacks";
const Feedback = () => {
  return (
    <div className="container-feedback">
      <div className="screen ">
        <HeaderBlack />
        <Feedbacks />
      </div>
    </div>
  );
};

export default Feedback;
