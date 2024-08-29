import React, { createContext, useReducer } from 'react';

// Reducer function
//  -   Handles changes made in components and updates the context state 
export const Reducer = (state, action) => {
    switch(action.type) {
        case 'SET_GAMEMODE':
            return {
                ...state,
                gamemode: {
                    mode: action.payload.mode,
                    type: action.payload.type
                }
            }
        case 'SET_GAMESTATE':
            return{
                ...state,
                gameState: action.payload
            };

        case 'SET_TIMER':
            return{
                ...state,
                timer: action.payload.timer,
                timerId: action.payload.timerId
            };

        case 'SET_INGAME_STATS':
            return{
                ...state,
                hits: action.payload.hits,
                misses: action.payload.misses,
                misclicks: action.payload.misclicks,
                score: action.payload.score
            }
        case 'SET_SCORE':
            return {
                ...state,
                score: action.payload 
            }
        case 'RESET_GAME':
            if (state.timerId) {
                clearInterval(state.timerId);
            }
            return {
                ...state,
                resetGame: !(state.resetGame),
                gameState: "pregame",
                timerId: null,
                hits: 0,
                misses: 0,
                misclicks: 0,
            }
            
        default:
            return state;
    }
}

// Initial State
const initialState = {
    gamemode: {
        mode: "Circlefall",
        type: "Normal"
    },
    gameState: "pregame",
    resetGame: false,
    timer: 3,
    timerId: null,
    hits: 0,
    misses: 0,
    misclicks: 0,
    score: 0,
};

// Context Creation
export const GamemodeContext = createContext();

// Provider Component
//  -   Components using this context are required to be wrapped in this component to receive the context state
export const GamemodeProvider = ({ children }) => {
    const [state, gamemodeDispatch] = useReducer(Reducer, initialState);

    return (
        <GamemodeContext.Provider
            value={{
                gamemode: state.gamemode,
                gameState: state.gameState,
                resetGame: state.resetGame,
                timer: state.timer,
                hits: state.hits,
                misses: state.misses,
                misclicks: state.misclicks,
                score: state.score,
                gamemodeDispatch
            }}
        >
            {children}
        </GamemodeContext.Provider>
    );
}
