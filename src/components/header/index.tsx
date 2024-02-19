import { useState } from "react";
import GameSession from "../../lib/session";
import { useInitialEffect } from "../../lib/utils";
import "./header.css";

type Props = {
  game: GameSession;
};

function Header({ game }: Props) {
  const [gameOver, setGameOver] = useState<boolean>(game.isGameOver());

  useInitialEffect(() => {
    game.onBoardChange(() => {
      setGameOver(game.isGameOver());
    });
  });

  return (
    <div className="header" data-testid="header">
      <h2>
        {gameOver
          ? `Whoops! The game is over. The winner is: ${game.getLoser()}`
          : `Turn: ${game.getOrientation()}`}
      </h2>
    </div>
  );
}

export default Header;
