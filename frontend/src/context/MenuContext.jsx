import React, { createContext, useReducer } from 'react';

// Reducer function
//  -   Handles changes made in components and updates the context state 
export const Reducer = (state, action) => {
    switch(action.type) {
        case 'OPEN_POPUP':
            return {
                ...state,
                popup: {
                    visible: true,
                    type: action.payload
                }
            }

        case 'CLOSE_POPUP':
            return {
                ...state,
                popup: {
                    visible: false,
                    type: null
                }
            }

        case 'SHOW_ALERT':
            return {
                ...state,
                alert: {
                    visible: true,
                    type: action.payload.type,
                    message: action.payload.message
                }
            }
        
        case 'CLOSE_ALERT':
            return {
                ...state,
                alert: {
                    visible: false,
                    type: null,
                    message: null
                }
            }

        default:
            return state;
    }
}

// Initial State
const initialState = {
    popup: {
        visible: false,
        type: null
    },
    alert: {
        visible: false,
        type: null,
        message: null
    }
}

// Context Creation
export const MenuContext = createContext();

// Provider Component
//  -   Components using this context are required to be wrapped in this component to receive the context state
export const MenuProvider = ({ children }) => {
    const [state, menuDispatch] = useReducer(Reducer, initialState);

    return (
        <MenuContext.Provider
            value={{
                popup: state.popup,
                alert: state.alert,
                menuDispatch
            }}
        >
            {children}
        </MenuContext.Provider>
    );
}