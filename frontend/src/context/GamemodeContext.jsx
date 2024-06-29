import React, { createContext, useReducer } from 'react';

// Reducer Function
export const Reducer = (state, action) => {
    switch(action.type) {
        case 'SET_GAMEMODE':
            switch (action.payload) {
                case "Circlefall":
                    return {
                        ...state,
                        gamemodeType: "Circlefall",
                        gamemodeDataFilePath: "CirclefallNormal.json"
                    };
                case "Gridshot":
                    return {
                        ...state,
                        gamemodeType: "Gridshot",
                        gamemodeDataFilePath: "GridshotClassic.json"
                    };
                default:
                    return state;
            }

        case 'SET_GAMEMODE_DATA':
            return{
                ...state,
                gamemodeDataFilePath: action.payload
            };
            
        default:
            return state;
    }
}

// Initial State
const initialState = {
    gamemodeType: "Circlefall",
    gamemodeDataFilePath: "CirclefallNormal.json"
};

// Context Creation
export const Context = createContext();

// Provider Component
export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider
            value={{
                gamemodeType: state.gamemodeType,
                gamemodeDataFilePath: state.gamemodeDataFilePath,
                dispatch
            }}
        >
            {children}
        </Context.Provider>
    );
}
