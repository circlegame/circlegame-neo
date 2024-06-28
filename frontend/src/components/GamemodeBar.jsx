import React, { useContext } from 'react';
import { Context } from '../context/GamemodeContext';

function GamemodeBar() {
    const { gamemodeType,gamemodeDataFilePath,dispatch } = useContext(Context);
  
    // Switch gamemodes when button is pressed
    const switchGamemodes = () => {
        // Package the gamemode to send in payload
        const gamemode = {
            gamemodeType: gamemodeType,
            gamemodeDataFilePath: gamemodeDataFilePath
        };

        // Change gamemode state in the Context file
        dispatch ({
            type: 'CHANGE_GAMEMODE',
            payload: gamemode
        })
    }

    return (
        <button onClick={switchGamemodes}>{gamemodeType}</button>
    )
}

export default GamemodeBar