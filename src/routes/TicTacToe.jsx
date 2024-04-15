import React from "react";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import TicTacToePage from "../components/tic-tac-toe/TicTacToePage.jsx";
import "../styles/ticTacToe.css";
const TicTacToe = () => {
  return (
    <div className="container-tictactoe">
      <div className="screen">
        <Header />
        <TicTacToePage />
        <div className="mg-home-button-adjust">
          <HomeButton />
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
