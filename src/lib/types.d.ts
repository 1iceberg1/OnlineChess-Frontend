// export type GameSessionTimer = { white: number; black: number };

export type GameSessionListeners = {
  move: Array<(position: string) => void>;
};

export type GameSessionHistory = {
  position: string;
}[];

export type GameSessionStorage = {
  history: GameSessionHistory;
  position: string;
  currentIndex: number;
};
