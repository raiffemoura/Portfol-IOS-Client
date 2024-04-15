import React from "react";
import iconConfig from "../iconConfig";

export default function CardElement(props) {
  return (
    <div
      onClick={() => props.handleFlip(props.card)}
      id={props.card.id}
      className={`mg-card ${props.card.flipped ? "mg-flip" : ""}`}
    >
      <div className="mg-card-front">
        <img
          className="mg-icon"
          src={iconConfig[`${props.card.icon}Icon`]}
          alt={props.card.icon}
        />
      </div>
      <div className="mg-card-back">{"</>"}</div>
    </div>
  );
}
