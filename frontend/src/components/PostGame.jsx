import React, { useContext } from 'react';
import { Context } from '../context/GamemodeContext';
import './Component.css';

function PostGame() {
  const { gameState, hits, misses, misclicks, dispatch } = useContext(Context);

  const handleReset = () => {
    dispatch({type: 'RESET_GAME'});
  };

  return (
    <>
      {gameState === 'endgame' && (
        <>
          <div>Hits: {hits}&emsp;Misses: {misses}&emsp;Misclicks: {misclicks}</div>
          <button onClick={handleReset}>Home</button>
        </>
      )}
    </>
  );
}

export default PostGame;