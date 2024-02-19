import { useLayoutEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import GameSession from "../../lib/session";
import { useInitialEffect } from "../../lib/utils";
import "./board.css";

type Props = {
  game: GameSession;
};

type Square =
  | 'a8'
  | 'b8'
  | 'c8'
  | 'd8'
  | 'e8'
  | 'f8'
  | 'g8'
  | 'h8'
  | 'a7'
  | 'b7'
  | 'c7'
  | 'd7'
  | 'e7'
  | 'f7'
  | 'g7'
  | 'h7'
  | 'a6'
  | 'b6'
  | 'c6'
  | 'd6'
  | 'e6'
  | 'f6'
  | 'g6'
  | 'h6'
  | 'a5'
  | 'b5'
  | 'c5'
  | 'd5'
  | 'e5'
  | 'f5'
  | 'g5'
  | 'h5'
  | 'a4'
  | 'b4'
  | 'c4'
  | 'd4'
  | 'e4'
  | 'f4'
  | 'g4'
  | 'h4'
  | 'a3'
  | 'b3'
  | 'c3'
  | 'd3'
  | 'e3'
  | 'f3'
  | 'g3'
  | 'h3'
  | 'a2'
  | 'b2'
  | 'c2'
  | 'd2'
  | 'e2'
  | 'f2'
  | 'g2'
  | 'h2'
  | 'a1'
  | 'b1'
  | 'c1'
  | 'd1'
  | 'e1'
  | 'f1'
  | 'g1'
  | 'h1';

function Board({ game }: Props): JSX.Element {
  const [position, setPosition] = useState<string>(game.getPosition());
  const [chessboardSize, setChessboardSize] = useState<number | undefined>(
    undefined
  );

  // Observers
  useInitialEffect(() => {
    game.onBoardChange((position) => {
      setPosition(position);
    });
  });

  // Chess resize
  useLayoutEffect(() => {
    function handleResize() {
      const display = document.getElementById("container") as HTMLElement;
      setChessboardSize(Math.min(720, display?.offsetWidth - 20));
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  // Functions
  const onDrop = (from: Square, to: Square) => {
    if (!game.isGameOver()) {
      return !!game.move({ from, to });
    }

    return false;
  };

  return (
    <div className="board" data-testid="board">
      <Chessboard
        animationDuration={200}
        boardOrientation="white"
        boardWidth={chessboardSize}
        position={position}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        }}
      />
    </div>
  );
}

export default Board;
