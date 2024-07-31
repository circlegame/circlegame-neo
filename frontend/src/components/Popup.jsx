import React, { useContext, useEffect, useRef } from 'react';
import { MenuContext } from '../context/MenuContext';
import Leaderboard from './popups/Leaderboard';
import Settings from './popups/Settings';
import Info from './popups/Info';
import Login from './popups/Login';
import Signup from './popups/Signup';
import Profile from './popups/Profile';
import Alert from './popups/Alert';
import Contact from './popups/Contact';
import styled from 'styled-components';

function Popup() {
    const { menuDispatch, popup, alert } = useContext(MenuContext);
    const popupRef = useRef();

    // Choose which popup to render
    const renderContent = () => {
        switch(popup.type){
            case 'leaderboard':
                return (
                    <Leaderboard/>
                );
            case 'settings':
                return (
                    <Settings/>
                );
            case 'info':
                return (
                    <Info/>
                );
            case 'login':
                return (
                    <Login/>
                );
            case 'signup':
                return (
                    <Signup/>
                );
            case 'profile':
                return (
                    <Profile/>
                )
            case 'contact':
                return(
                    <Contact/>
                )

            default:
                return undefined;
        }
    }

    // Handle closing the popup
    const handleClose = () => {
        menuDispatch({
            type: 'CLOSE_POPUP'
        })
    }

    // Detect click outside of the popup and close it
    useEffect(() => {
        // Function to handle the click event
        const handleClickOutside = (event) => {
            // Check if the click happened outside the div
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                handleClose();
            }
        };

        // Add event listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClose]);
        
    return (
        <>
            {popup.visible && (
                <PopupContainer>
                    <PopupDiv
                        ref={popupRef}
                        style={popup.type === 'login' || popup.type === 'signup' ?
                              {maxWidth: '325px'}
                            : {maxWidth: '600px', display: 'flex', flexDirection: 'column'}}
                    >
                        {renderContent()}
                    </PopupDiv>
                </PopupContainer>
            )}

            {alert.visible && <Alert/>}
        </>
    );
}

export default Popup;

// Styling
const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1000;
`;

const PopupDiv = styled.div`
    background: #242424;
    padding: 10px;
    border-radius: 5px;
    width: 50%;
    position: relative;
`;