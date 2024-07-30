import React, { useContext } from 'react';
import { GamemodeContext } from '../context/GamemodeContext';
import './Component.css';

function PostGame() {
  const { gameState, hits, misses, misclicks, gamemodeDispatch } = useContext(GamemodeContext);

  const handleReset = () => {
    gamemodeDispatch({type: 'RESET_GAME'});
  };

  return (
    <>
      {gameState === 'endgame' && (
        <div style={{display: 'block'}}>
          <div>
            Score: {hits-misses-misclicks}
            &emsp;
            Hits: {hits}
            &emsp;
            Misses: {misses}
            &emsp;
            Misclicks: {misclicks}
          </div>
          <button onClick={handleReset}>Home</button>
        </div>
      )}
    </>
  );
}

export default PostGame;