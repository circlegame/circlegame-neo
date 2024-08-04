import React, { useRef, useEffect, useContext } from 'react';
import { GamemodeContext } from '../context/GamemodeContext';
import { MenuContext } from '../context/MenuContext';
import styled from 'styled-components';

import p5 from 'p5';
import { Circlefall } from './../p5/Circlefall';
import { Gridshot } from './../p5/Gridshot';
import { CirclefallWave } from '../p5/CirclefallWave';
import { GridshotWave } from '../p5/GridshotWave';

const P5Wrapper = () => {
  // Use context to get all variables from the sketch and menu
  const gameContext = useContext(GamemodeContext);
  const { popup } = useContext(MenuContext);

  // Create a ref to store the DOM node for the p5.js sketch
  const sketchRef = useRef();

  // Function to handle reset
  const handleReset = () => {
    gameContext.gamemodeDispatch({ type: 'RESET_GAME' });
  }

  // useEffect to initialize and cleanup the p5.js instance
  useEffect(() => {
    // Initialize p5.js instance and attach it to the sketchRef DOM node
    let sketch;
    let gamemodeDataFilePath;

    const paths = {
      Circlefall: {
          Easy: { sketch: CirclefallWave, filePath: "CirclefallEasy" },
          Normal: { sketch: CirclefallWave, filePath: "CirclefallNormal" },
          Hard: { sketch: CirclefallWave, filePath: "CirclefallHard" },
          Impossible: { sketch: CirclefallWave, filePath: "CirclefallImpossible" },
          Marathon: { sketch: CirclefallWave, filePath: "CirclefallMarathon" },
          default: { sketch: CirclefallWave, filePath: "CirclefallNormal" }
      },
      Gridshot: {
          Classic: { sketch: Gridshot, filePath: "GridshotClassic" },
          Mini: { sketch: Gridshot, filePath: "GridshotMini" },
          Wave: { sketch: GridshotWave, filePath: "GridshotWave" },
          default: { sketch: Gridshot, filePath: "GridshotClassic" }
      },
      default: { sketch: Circlefall, filePath: "CirclefallNormal" }
    };

    const mode = paths[gameContext.gamemode.mode] || paths.default;
    const type = mode[gameContext.gamemode.type] || mode.default;

    sketch = type.sketch;
    gamemodeDataFilePath = type.filePath;

    const p5Instance = new p5((p) => sketch(p, gamemodeDataFilePath, {dispatch: gameContext.gamemodeDispatch, popupVisible: popup.visible}), sketchRef.current);

    // Cleanup the p5.js instance when the component unmounts
    return () => {
      p5Instance.remove();
    };
  }, [gameContext.resetGame, gameContext.gamemode, popup.visible]);

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
      <P5Container>
     
        {gameContext.gameState === 'ingame' ? (
          <StatsOverlay>
            Score {gameContext.hits - gameContext.misses - gameContext.misclicks}
            &emsp;
            Hit {gameContext.hits}
            &emsp;
            Missed {gameContext.misses}
            &emsp;
            Misclicked {gameContext.misclicks}
            &emsp;
            Time {gameContext.timer}
          </StatsOverlay>
        ) : <StatsPlaceholder/> }

        <SketchFilter 
          className={gameContext.gameState === 'pregame' ? 'blur' : 'crosshair'}
          style={{width: '800px', height: '600px'}}
          ref={sketchRef}
        />

        {gameContext.gameState === 'pregame' && ( 
          <SketchOverlay style={{color: '#666666', fontSize: '20px'}} >
            click here to start
          </SketchOverlay> 
        )}
        {gameContext.gameState === 'countdown' && ( 
          <SketchOverlay style={{color: 'white', fontSize: '48px'}} >
            {gameContext.timer}
          </SketchOverlay> 
        )}

      </P5Container>
    )}

    </>
  );
};

export default P5Wrapper;

// Styling
const P5Container = styled.div`
  position: relative;
`;

const StatsPlaceholder = styled.div`
  height: 24px;
`;

const StatsOverlay = styled.div`
  text-align: left;
  font-size: 24px;
`;

const SketchFilter = styled.div`
  width: 800px;
  height: 600px;

  &.blur{
    filter: blur(12px);
    clip-path: inset(-10px round 10px);
    transition: filter 0.2s ease-in-out;
  };
  &.crosshair{
    cursor: crosshair;
    transition: filter 0.2s ease-in-out;
  };

`;

const SketchOverlay = styled.div`
  position: absolute;
  text-align: center;
  top: 324px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;