import React, { createContext, useReducer } from 'react';

// Reducer Function
export const Reducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_GAMEMODE':
            switch (action.payload.gamemodeType) {
                case "Circlefall":
                    return {
                        ...state,
                        gamemodeType: "Gridshot",
                        gamemodeDataFilePath: "Gridshot.json"
                    };
                case "Gridshot":
                    return {
                        ...state,
                        gamemodeType: "Circlefall",
                        gamemodeDataFilePath: "Circlefall.json"
                    };
                default:
                    return state;
            }

        case 'UPDATE_GAMEMODE_DATA':
            return{
                ...state,
                gamemodeData: {
                    ...state.gamemodeData,
                    [action.payload.key]: action.payload.value
                }
            };
            
        default:
            return state;
    }
}

// Initial State
const initialState = {
    gamemodeType: "Circlefall",
    gamemodeDataFilePath: "Circlefall.json"
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
