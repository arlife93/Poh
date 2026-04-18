import { createContext, useContext, useState } from "react";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [round, setRound] = useState(null);
  const [history, setHistory] = useState([]);

  const addHistory = (entry) => {
    setHistory((h) => [...h, entry]);
  };

  return (
    <GameContext.Provider value={{ round, setRound, history, addHistory }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}