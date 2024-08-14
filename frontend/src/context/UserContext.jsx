import React, { createContext, useReducer } from 'react';

// Reducer function
//  -   Handles changes made in components and updates the context state 
export const Reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                loggedin: true,
                username: action.payload
            }

        case 'LOGOUT':
            return {
                ...state,
                loggedin: false,
                username: undefined
            }
            
        default:
            return state;
    }
}

// Initial State
const initialState = {
    loggedin: false,
    username: undefined
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
                userDispatch
            }}
        >
            {children}
        </UserContext.Provider>
    );
}