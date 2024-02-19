import { Chess, ChessInstance, ShortMove } from "chess.js";
import {
  GameSessionHistory,
  GameSessionListeners,
  GameSessionStorage,
} from "./types";

const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

class GameSession {
  chess: ChessInstance;
  listeners: GameSessionListeners;
  history: GameSessionHistory;
  currentIndex: number;
  isReset?: boolean;

  constructor(loadFromStorage?: boolean) {
    const storedSessionValue = localStorage.getItem("gameSession");
    const session: GameSessionStorage =
      storedSessionValue && loadFromStorage
        ? JSON.parse(storedSessionValue)
        : undefined;

    this.chess = new Chess();
    this.chess.load(session ? session.position : initialPosition);

    this.history = session
      ? session.history
      : [
          {
            position: initialPosition,
          },
        ];

    this.currentIndex = session ? session.currentIndex : 0;

    this.listeners = { move: []};

  }

  getOrientation() {
    return this.chess.turn() === "w" ? "white" : "black";
  }

  move(move: string | ShortMove) {
    const moved = this.chess.move(move);

    if (!moved) {
      return null;
    }

    // Check if the board is not in the latest state of the history
    if (this.history.length !== this.currentIndex + 1) {
      const regression = this.history.length - (this.currentIndex + 1);
      this.history.splice(-regression);
    }

    this.history = [
      ...this.history,
      {
        position: this.getPosition(),
      },
    ];
    this.currentIndex++;

    this.trigger("move", this.getPosition());
    this.save();

    return moved;
  }

  reset() {
    this.isReset = true;
    this.chess.reset();
    this.history = [
      {
        position: initialPosition,
      },
    ];
    this.trigger("move", initialPosition);
    this.currentIndex = 0;
    this.save();
  }

  undo() {
    const previousPosition = this.history[this.currentIndex - 1];
    // const currentPosition = this.history[this.currentIndex];

    if (!previousPosition) {
      return;
    }

    this.chess.load(previousPosition.position);
    this.currentIndex--;
    this.trigger("move", previousPosition.position);
    this.save();
  }

  redo() {
    const nextPosition = this.history[this.currentIndex + 1];
    // const currentPosition = this.history[this.currentIndex];

    if (!nextPosition) {
      return;
    }

    this.chess.load(nextPosition.position);
    this.currentIndex++;
    this.trigger("move", nextPosition.position);
    this.save();
  }

  getPosition() {
    return this.chess.fen();
  }

  save() {
    const game: GameSessionStorage = {
      history: this.history,
      position: this.history[this.currentIndex].position,
      currentIndex: this.currentIndex,
    };

    localStorage.setItem("gameSession", JSON.stringify(game));
  }

  isGameOver() {
    // return !this.timer.white || !this.timer.black || this.chess.game_over();
    return this.chess.game_over();
  }

  isFirstMove() {
    return this.history.length === 1;
  }

  getLoser() {
    return this.chess.in_checkmate()
      ? this.chess.turn() !== "w"
        ? "white"
        : "black"
      : "draw";
  }

  // Event handlers
  onBoardChange(handler: GameSessionListeners["move"][number]) {
    this.listeners.move.push(handler);
  }

  trigger<Events extends keyof GameSessionListeners>(
    event: Events,
    data: Parameters<GameSessionListeners[Events][number]>[number]
  ) {
    this.listeners[event].forEach((listener) => listener(data as any));
  }
}

export default GameSession;
