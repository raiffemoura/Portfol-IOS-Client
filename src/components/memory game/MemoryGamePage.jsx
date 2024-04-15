import React, { useEffect, useState } from "react";
import GameOver from "./GameOver";
import GameBoard from "./GameBoard";
import game from "./game/game";
import { useTranslation } from "react-i18next";
const MemoryGamePage = () => {
  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState([]);

  const { t } = useTranslation();
  useEffect(() => {
    setCards(game.createCardsFromTechs());
  }, []);

  const restart = () => {
    game.clearCards();
    setCards(game.createCardsFromTechs());
    setGameOver(false);
  };

  function handleFlip(card) {
    game.flipCard(
      card.id,
      () =>
        // Game Over Callback
        setGameOver(true),
      () =>
        // No Match Callback
        setGameOver(false)
    );
    setCards([...game.cards]);
  }
  return (
    <div className="mg-container">
      <div className="mg-title">
        <h1>{t("memory game")}</h1>
      </div>
      <GameBoard handleFlip={handleFlip} cards={cards} />
      <GameOver show={gameOver} handleRestart={restart} />
    </div>
  );
};

export default MemoryGamePage;
