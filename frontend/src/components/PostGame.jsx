import React, { useContext } from 'react';
import { GamemodeContext } from '../context/GamemodeContext';

function PostGame() {
  const gameContext = useContext(GamemodeContext);

  const handleReset = () => {
    gameContext.gamemodeDispatch({type: 'RESET_GAME'});
  };

  return (
    <>
      {gameContext.gameState === 'endgame' && (
        <div style={{display: 'block'}}>
          <div>
            Score: {gameContext.score}
            &emsp;
            Hits: {gameContext.hits}
            &emsp;
            Misses: {gameContext.misses}
            &emsp;
            Misclicks: {gameContext.misclicks}
          </div>
          <button onClick={handleReset}>Home</button>
        </div>
      )}
    </>
  );
}

export default PostGame;