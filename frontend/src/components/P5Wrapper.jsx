import React, { useRef, useEffect, useContext } from 'react';
import p5 from 'p5';
import {Circlefall} from './../p5/Circlefall'
import {Gridshot} from './../p5/Gridshot'
import {Context} from '../context/GamemodeContext'
import './Component.css'

const P5Wrapper = () => {
  // Use context to get all variables from the sketch
  const gameContext = useContext(Context);

  // Create a ref to store the DOM node for the p5.js sketch
  const sketchRef = useRef();

  // Function to handle reset
  const handleReset = () => {
    gameContext.dispatch({ type: 'RESET_GAME' });
  }

  // useEffect to initialize and cleanup the p5.js instance
  useEffect(() => {
    // Initialize p5.js instance and attach it to the sketchRef DOM node
    let sketch;
    switch (gameContext.gamemodeType){
      case "Circlefall":
        sketch = Circlefall;
        break;
      case "Gridshot":
        sketch = Gridshot;
        break
      default:
        sketch = Circlefall;
    }
    const p5Instance = new p5((p) => sketch(p, gameContext.gamemodeDataFilePath, gameContext.dispatch), sketchRef.current);

    // Cleanup the p5.js instance when the component unmounts
    return () => {
      p5Instance.remove();
    };
  }, [gameContext.resetGame, gameContext.gamemodeDataFilePath]);

  // useEffect to listen for TAB key press to reset game
  useEffect(() => {
    // Function to handle keypresses
    const handleKeyDown = (event) => {
      if (event.key === 'Tab'){
        event.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);      // Listen for keypresses, call handleKeyDown
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Remove listener
    };
  }, []);

  // Render a div that will be used as the container for the p5.js canvas
  return (
    <>
      
    {gameContext.gameState !== 'endgame' && (
      <div style={{ position: 'relative' }}>

        {gameContext.gameState === 'ingame' ? (
          <div className='stats-overlay'>Hit {gameContext.hits}&emsp;Missed {gameContext.misses}&emsp;Misclicked {gameContext.misclicks}&emsp;Time {gameContext.timer}</div>
        ) : <div className='placeholder-stats-overlay'></div> }

        <div 
          className={gameContext.gameState === 'pregame' ? 'blur' : 'crosshair'}
          style={{width: '800px', height: '600px'}}
          ref={sketchRef}
        />

        {gameContext.gameState === 'pregame' && ( 
          <div 
            style={{color: '#666666', fontSize: '20px'}} 
            className="sketch-overlay">
              click here to start
            </div> 
        )}
        {gameContext.gameState === 'countdown' && ( 
          <div 
            style={{color: 'white', fontSize: '48px'}} 
            className="sketch-overlay">
              {gameContext.timer}
            </div> 
        )}

      </div>
    )}

    </>
  );
};

export default P5Wrapper;