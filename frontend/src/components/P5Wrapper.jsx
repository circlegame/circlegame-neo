import React, { useRef, useEffect, useContext } from 'react';
import p5 from 'p5';
import {Circlefall} from './../p5/Circlefall'
import {Gridshot} from './../p5/Gridshot'
import {Context} from '../context/GamemodeContext'
import './Component.css'

const P5Wrapper = () => {
  // Use context to get current gamemode
  const { gamemodeType, gamemodeDataFilePath, gameState, resetGame, timer, setTimer, hits, misses, misclicks, dispatch} = useContext(Context);

  // Create a ref to store the DOM node for the p5.js sketch
  const sketchRef = useRef();

  // useEffect to initialize and cleanup the p5.js instance
  useEffect(() => {
    // Initialize p5.js instance and attach it to the sketchRef DOM node
    let sketch;
    switch (gamemodeType){
      case "Circlefall":
        sketch = Circlefall;
        break;
      case "Gridshot":
        sketch = Gridshot;
        break
      default:
        sketch = Circlefall;
    }
    const p5Instance = new p5((p) => sketch(p, gamemodeDataFilePath, setTimer, dispatch), sketchRef.current);

    // Cleanup the p5.js instance when the component unmounts
    return () => {
      p5Instance.remove();
    };
  }, [resetGame, gamemodeDataFilePath]);

  // Render a div that will be used as the container for the p5.js canvas
  return (
    <>
      
    {gameState !== 'endgame' && (
      <div style={{ position: 'relative' }}>

        {gameState === 'ingame' ? (
          <div className='stats-overlay'>Hit {hits}&emsp;Missed {misses}&emsp;Misclicked {misclicks}</div>
        ) : <div className='placeholder-stats-overlay'></div> }

        <div 
          className={gameState === 'pregame' ? 'blur' : 'crosshair'}
          style={{width: '800px', height: '600px'}}
          ref={sketchRef}
        />

        {gameState === 'pregame' && ( 
          <div 
            style={{color: '#666666', fontSize: '20px'}} 
            className="sketch-overlay">
              click here to start
            </div> 
        )}
        {gameState === 'countdown' && ( 
          <div 
            style={{color: 'white', fontSize: '48px'}} 
            className="sketch-overlay">
              {timer}
            </div> 
        )}

      </div>
    )}

    </>
  );
};

export default P5Wrapper;