import React from "react";
import { useTranslation } from "react-i18next";
import Game from "./Game";

const TicTacToePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="tic-tac-toe-header">
        <h1>{t("ticTacToe")} Gamer</h1>
      </div>
      <Game />
    </div>
  );
};

export default TicTacToePage;
