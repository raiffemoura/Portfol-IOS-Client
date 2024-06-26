import React from "react";
import CardElement from "./CardElement";

export default function GameBoard(props) {
  return (
    <div className="mg-gameBoard">
      {props.cards.map((card, index) => (
        <CardElement handleFlip={props.handleFlip} key={index} card={card} />
      ))}
    </div>
  );
}
