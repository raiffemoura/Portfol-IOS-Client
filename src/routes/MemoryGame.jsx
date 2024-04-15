import React from "react";
import Header from "../components/Header";
import HomeButtonBlack from "../components/HomeButtonBlack";
import MemoryGamePage from "../components/memory game/MemoryGamePage.jsx";
import "../styles/memoryGame.css";
const MemoryGame = () => {
  return (
    <div className="container-memory-game">
      <div className="screen">
        <Header />
        <MemoryGamePage />
        <div className="mg-home-button-adjust">
          <HomeButtonBlack />
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
