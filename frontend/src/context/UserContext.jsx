import React, { createContext, useReducer } from 'react';

// Reducer function
//  -   Handles changes made in components and updates the context state 
export const Reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                loggedin: true,
                username: action.payload.username,
                settings: action.payload.settings,
                scores: action.payload.scores
            }

        case 'LOGOUT':
            return {
                ...state,
                loggedin: false,
                username: undefined,
                scores: [],
            }
        
        case 'UPDATE_SETTING':
            return{
                ...state,
                settings: {
                    ...state.settings,
                    [action.settingName]: action.payload
                }
            }
        case 'ADD_SCORE':
            return{
                ...state,
                scores: [
                    ...state.scores,
                    {
                        stats: {
                            hits: action.payload.hits,
                            misses: action.payload.misses,
                            misclicks: action.payload.misclicks,
                        },
                        gamemode: action.payload.gamemode,
                        score: action.payload.score,
                        date: new Date().toISOString(),

                    }
                ]

            }
        default:
            return state;
    }
}

// Initial State
const initialState = {
    loggedin: false,
    username: undefined,
    settings: {
        hitSound: 'plop.wav',
        masterVolume: 100,
        hitSoundVolume: 50,
    },
    scores: []
};

// Context Creation
export const UserContext = createContext();

// Provider Component
//  -   Components using this context are required to be wrapped in this component to receive the context state
export const UserProvider = ({ children }) => {
    const [state, userDispatch] = useReducer(Reducer, initialState);

    return (
        <UserContext.Provider
            value={{
                loggedin: state.loggedin,
                username: state.username,
                settings: state.settings,
                scores: state.scores,
                userDispatch
            }}
        >
            {children}
        </UserContext.Provider>
    );
}