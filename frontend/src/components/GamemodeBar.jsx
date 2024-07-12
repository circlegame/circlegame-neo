import React, { useContext } from 'react';
import { Context } from '../context/GamemodeContext';
import './Component.css';

function GamemodeBar() {
    const { gamemodeType, gamemodeDataFilePath, gameState, dispatch } = useContext(Context);
  
    // Switch gamemodes when button is pressed
    const changeGamemode = (gamemodeType) => {
        // Change gamemode state in the GamemodeContext file
        dispatch ({
            type: 'SET_GAMEMODE',
            payload: gamemodeType
        })
    }

    const changeGamemodeData = (gamemodeDataFilePath) => {
        // Change gamemode data file path in the GamemodeContext file
        dispatch({
            type: 'SET_GAMEMODE_DATA',
            payload: gamemodeDataFilePath
        })
    }

    return (
      <>
      
      <div className="gamemode-bar-container">
        <div className={`gamemode-bar ${gameState === 'pregame' ? "" : 'hidden'}`}>

          <button
            className={`gamemode-button ${gamemodeType === "Circlefall" ? "active" : ""}`}
            onClick={() => changeGamemode("Circlefall")}
          >
            Circlefall
          </button>
          <button
            className={`gamemode-button ${gamemodeType === "Gridshot" ? "active" : ""}`}
            onClick={() => changeGamemode("Gridshot")}
          >
            Gridshot
          </button>

          {gamemodeType === "Circlefall" && (
            <>
              <div className="divider"></div>

              <div className="gamemode-data-buttons">

                <button
                  className={`gamemode-button ${gamemodeDataFilePath === "CirclefallNormal.json" ? "active" : ""}`}
                  onClick={() => changeGamemodeData("CirclefallNormal.json")}
                >
                  Normal
                </button>
                <button
                  className={`gamemode-button ${gamemodeDataFilePath === "CirclefallHard.json" ? "active" : ""}`}
                  onClick={() => changeGamemodeData("CirclefallHard.json")}
                >
                  Hard
                </button>
                <button
                  className={`gamemode-button ${gamemodeDataFilePath === "CirclefallImpossible.json" ? "active" : ""}`}
                  onClick={() => changeGamemodeData("CirclefallImpossible.json")}
                >
                  Impossible
                </button>

              </div>
            </>
          )}

          {gamemodeType === "Gridshot" && (
            <>
              <div className="divider"></div>

              <div className="gamemode-data-buttons">

              <button
                  className={`gamemode-button ${gamemodeDataFilePath === "GridshotClassic.json" ? "active" : ""}`}
                  onClick={() => changeGamemodeData("GridshotClassic.json")}
                >
                  Classic
                </button>
                <button
                  className={`gamemode-button ${gamemodeDataFilePath === "GridshotMini.json" ? "active" : ""}`}
                  onClick={() => changeGamemodeData("GridshotMini.json")}
                >
                  Mini
                </button>

              </div>
            </>
          )}

        </div>
      </div>

      </>
    )
}

export default GamemodeBar