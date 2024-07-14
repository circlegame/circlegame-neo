import React, { createContext, useReducer, useState } from 'react';

// Reducer Function
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
                misclicks: action.payload.misclicks
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
};

// Context Creation
export const Context = createContext();

// Provider Component
export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider
            value={{
                gamemode: state.gamemode,
                gameState: state.gameState,
                resetGame: state.resetGame,
                timer: state.timer,
                hits: state.hits,
                misses: state.misses,
                misclicks: state.misclicks,
                dispatch
            }}
        >
            {children}
        </Context.Provider>
    );
}
