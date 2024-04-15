import React, { useState } from "react";
import iconConfig from "../iconConfig";
import { useTranslation } from "react-i18next";

// Função para inicializar o estado do jogo
const getInitialState = () => {
  const state = {};
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      state[`${r}-${c}`] = null; // Cria um estado inicial vazio para cada célula do jogo
    }
  }
  return state;
};

// Função para obter a chave a partir do índice
const getKeyFromIndex = (index) => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return `${row}-${col}`;
};

// Função para renderizar o ícone de acordo com o valor da célula
const getLabel = (value) => {
  if (!value) {
    return null;
  }

  return value > 0 ? (
    <img src={iconConfig.tictactoeXbox} alt="xbox" />
  ) : (
    <img src={iconConfig.tictactoePs} alt="ps" />
  );
};

// Função para verificar se há um vencedor
const getWinner = (v) => {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      // Verifica linhas, colunas e diagonais para determinar se há um vencedor

      const sumRow = v[`${r}-${c}`] + v[`${r}-${c + 1}`] + v[`${r}-${c + 2}`];
      if (sumRow === 3 || sumRow === -3) {
        return sumRow;
      }

      const sumCol = v[`${r}-${c}`] + v[`${r + 1}-${c}`] + v[`${r + 2}-${c}`];
      if (sumCol === 3 || sumCol === -3) {
        return sumCol;
      }

      const sumDiagonal =
        v[`${r}-${c}`] + v[`${r + 1}-${c + 1}`] + v[`${r + 2}-${c + 2}`];
      if (sumDiagonal === 3 || sumDiagonal === -3) {
        return sumDiagonal;
      }
      const sumReverseDiagonal =
        v[`${r}-${c}`] + v[`${r + 1}-${c - 1}`] + v[`${r + 2}-${c - 2}`];
      if (sumReverseDiagonal === 3 || sumReverseDiagonal === -3) {
        return sumReverseDiagonal;
      }
    }
  }
  return null;
};

const Game = () => {
  const [values, setValues] = useState(getInitialState);
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [PSWinner, setPSWinner] = useState(0);
  const [XboxWinner, setXboxWinner] = useState(0);

  const { t } = useTranslation();

  const handleClick = (key) => {
    if (winner || values[key]) {
      return;
    }
    const newValues = {
      ...values,
      [key]: player,
    };
    setValues(newValues);
    setPlayer(player * -1);
    const newWinner = getWinner(newValues);
    if (newWinner) {
      setWinner(newWinner > 0 ? 1 : -1);
      addWinner(newWinner);
    }
  };

  // Função para reiniciar o jogo
  const reset = () => {
    setValues(getInitialState);
    setPlayer(1);
    setWinner(null);
  };

  // Verifica se há um empate
  const itsATie = Object.values(values).filter(Boolean).length === 9 && !winner;
  // adicionando placar
  const addWinner = (winner) => {
    if (winner > 0) {
      setXboxWinner(XboxWinner + 1);
    } else {
      setPSWinner(PSWinner + 1);
    }
  };

  return (
    <div className="tictactoe-game">
      <div className="tictactoe-game-board">
        {Array.from({ length: 9 }).map((_, index) => {
          const key = getKeyFromIndex(index);
          return (
            <button key={index} type="button" onClick={() => handleClick(key)}>
              {getLabel(values[key])}
            </button>
          );
        })}
      </div>
      {(winner || itsATie) && (
        <div className="tictactoe-game-menu">
          {winner ? (
            <p>
              {t("theWinnerIs")} {winner > 0 ? "Xbox" : "PlayStation"}
            </p>
          ) : (
            <p>{t("itsATie")}</p>
          )}
          <button onClick={reset}>{t("playAgain")}</button>
        </div>
      )}
      <div className="tictactoe-game-info">
        <div className="tictactoe-player">
          {" "}
          <h3>PlayStation</h3>
          <h1>{PSWinner}</h1>
        </div>
        <div className="tictactoe-bar"></div>
        <div className="tictactoe-player">
          <h3>
            <span>Xbox</span>
          </h3>
          <h1>{XboxWinner}</h1>
        </div>
      </div>
    </div>
  );
};

export default Game;
