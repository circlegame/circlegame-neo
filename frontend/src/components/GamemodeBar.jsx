import React, { useContext } from 'react';
import { Context } from '../context/GamemodeContext';
import './Component.css';

function GamemodeBar() {
    const { gamemode, gameState, dispatch } = useContext(Context);
  
    // Switch gamemodes when button is pressed
    const changeGamemode = (mode, type) => {
        // Change gamemode state in the GamemodeContext file
        dispatch ({
            type: 'SET_GAMEMODE',
            payload: {
                mode: mode,
                type: type
            }
        })
    }

    return (
      <>
      
      {gameState === 'pregame' ? (
        <div className="gamemode-bar">

          <button
            className={`gamemode-button ${gamemode.mode === "Circlefall" ? "active" : ""}`}
            onClick={() => changeGamemode("Circlefall", "Normal")}
          >
            Circlefall
          </button>
          <button
            className={`gamemode-button ${gamemode.mode === "Gridshot" ? "active" : ""}`}
            onClick={() => changeGamemode("Gridshot", "Classic")}
          >
            Gridshot
          </button>

          {gamemode.mode === "Circlefall" && (
            <>
              <div className="divider"></div>

              <div className="gamemode-data-buttons">

                <button
                  className={`gamemode-button ${gamemode.type === "Normal" ? "active" : ""}`}
                  onClick={() => changeGamemode("Circlefall", "Normal")}
                >
                  Normal
                </button>
                <button
                  className={`gamemode-button ${gamemode.type === "Hard" ? "active" : ""}`}
                  onClick={() => changeGamemode("Circlefall", "Hard")}
                >
                  Hard
                </button>
                <button
                  className={`gamemode-button ${gamemode.type === "Impossible" ? "active" : ""}`}
                  onClick={() => changeGamemode("Circlefall", "Impossible")}
                >
                  Impossible
                </button>

              </div>
            </>
          )}

          {gamemode.mode === "Gridshot" && (
            <>
              <div className="divider"></div>

              <div className="gamemode-data-buttons">

              <button
                  className={`gamemode-button ${gamemode.type === "Classic" ? "active" : ""}`}
                  onClick={() => changeGamemode("Gridshot", "Classic")}
                >
                  Classic
                </button>
                <button
                  className={`gamemode-button ${gamemode.type === "Mini" ? "active" : ""}`}
                  onClick={() => changeGamemode("Gridshot", "Mini")}
                >
                  Mini
                </button>

              </div>
            </>
          )}

        </div>
      ) : gameState !== 'endgame' && (<div className='placeholder-gamemodebar'></div>) }
      </>
    )
}

export default GamemodeBar