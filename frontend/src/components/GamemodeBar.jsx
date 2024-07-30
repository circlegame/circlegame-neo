import React, { useContext } from 'react';
import { GamemodeContext } from '../context/GamemodeContext';
import styled from 'styled-components';

function GamemodeBar() {
    const { gamemode, gameState, gamemodeDispatch } = useContext(GamemodeContext);
  
    // Switch gamemodes when button is pressed
    const changeGamemode = (mode, type) => {
        // Change gamemode state in the GamemodeContext file
        gamemodeDispatch ({
            type: 'SET_GAMEMODE',
            payload: {
                mode: mode,
                type: type
            }
        })
    }

    return (
      <>
      
      <GamemodeBarContainer>
        <GamemodeBarDiv className={gameState === 'pregame' ? "" : 'hidden'}>

          <GamemodeButton
            className={gamemode.mode === "Circlefall" ? "active" : ""}
            onClick={() => changeGamemode("Circlefall", "Normal")}
          >
            Circlefall
          </GamemodeButton>
          <GamemodeButton
            className={gamemode.mode === "Gridshot" ? "active" : ""}
            onClick={() => changeGamemode("Gridshot", "Classic")}
          >
            Gridshot
          </GamemodeButton>

          <Divider/>

          {gamemode.mode === "Circlefall" && (
            <>
              <GamemodeDataButtons>

                <GamemodeButton
                  className={gamemode.type === "Easy" ? "active" : ""}
                  onClick={() => changeGamemode("Circlefall", "Easy")}
                >
                  Easy
                </GamemodeButton>

                <GamemodeButton
                  className={gamemode.type === "Normal" ? "active" : ""}
                  onClick={() => changeGamemode("Circlefall", "Normal")}
                >
                  Normal
                </GamemodeButton>

                <GamemodeButton
                  className={gamemode.type === "Hard" ? "active" : ""}
                  onClick={() => changeGamemode("Circlefall", "Hard")}
                >
                  Hard
                </GamemodeButton>

                <GamemodeButton
                  className={gamemode.type === "Impossible" ? "active" : ""}
                  onClick={() => changeGamemode("Circlefall", "Impossible")}
                >
                  Impossible
                </GamemodeButton>

                <GamemodeButton
                  className={gamemode.type === "Marathon" ? "active" : ""}
                  onClick={() => changeGamemode("Circlefall", "Marathon")}
                >
                  Marathon
                </GamemodeButton>

              </GamemodeDataButtons>
            </>
          )}

          {gamemode.mode === "Gridshot" && (
            <>
              <GamemodeDataButtons>

              <GamemodeButton
                  className={gamemode.type === "Classic" ? "active" : ""}
                  onClick={() => changeGamemode("Gridshot", "Classic")}
                >
                  Classic
                </GamemodeButton>
                <GamemodeButton
                  className={gamemode.type === "Mini" ? "active" : ""}
                  onClick={() => changeGamemode("Gridshot", "Mini")}
                >
                  Mini
                </GamemodeButton>

              </GamemodeDataButtons>
            </>
          )}

        </GamemodeBarDiv>
      </GamemodeBarContainer>

      </>
    )
}

export default GamemodeBar;

//Styling
const GamemodeBarContainer = styled.div`
  grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const GamemodeBarDiv = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #2b2b2b;
  border-radius: 10px;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
`;

const GamemodeDataButtons = styled.div`
  display: inline-flex;
`

const GamemodeButton = styled.button`
  background-color: transparent;
  color: #666666;
  border: none;
  padding: 8px 20px;
  margin: 0 5px;
  border-radius: 5px;
  outline: none;
  transition: color 0.3s, transform 0.3s;

  &:hover{
    color: #dddddd;
    transform: translateY(-2px);
  }
  &:focus{
    outline: none;
  }
  &.active{
    color: #ffffff;
    font-weight: bold;
  }
`;

const Divider = styled.div`
  width: 4px;
  height: 23px;
  background-color: #3b3b3b;
  margin: 0 10px;
  border-radius: 30px;
  align-self: center; 
`;