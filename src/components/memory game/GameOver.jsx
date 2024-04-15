import React from "react";
import { useTranslation } from "react-i18next";

const GameOver = (props) => {
  const { t } = useTranslation();
  return (
    <div>
      {props.show ? (
        <div className="mg-gameOver">
          <div>{t("congratsYouFinished")}</div>
          <button className="mg-restart" onClick={props.handleRestart}>
            {t("playAgain")}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default GameOver;
