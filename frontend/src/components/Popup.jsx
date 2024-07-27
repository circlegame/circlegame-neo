import React, { useContext, useEffect, useRef } from 'react';
import { MenuContext } from '../context/MenuContext';
import Leaderboard from './popups/Leaderboard';
import Settings from './popups/Settings';
import Info from './popups/Info';
import Login from './popups/Login';
import Signup from './popups/Signup';
import Profile from './popups/Profile';
import './Component.css';

function Popup() {
    const { menuDispatch, popup } = useContext(MenuContext);
    const popupRef = useRef();

    // Choose which popup to render
    const renderContent = () => {
        switch(popup.type){
            case 'leaderboard':
                return (
                    <div ref={popupRef} className='misc-popup'>
                        <Leaderboard/>
                    </div>
                );
            case 'settings':
                return (
                    <div ref={popupRef} className='misc-popup'>
                        <Settings/>
                    </div>
                );
            case 'info':
                return (
                    <div ref={popupRef} className='misc-popup'>
                        <Info/>
                    </div>
                );
            case 'login':
                return (
                    <div ref={popupRef} className='signup-login-popup'>
                        <Login/>
                    </div>
                );
            case 'signup':
                return (
                    <div ref={popupRef} className='signup-login-popup'>
                        <Signup/>
                    </div>
                );
            case 'profile':
                return (
                    <div ref={popupRef} className='misc-popup'>
                        <Profile/>
                    </div>
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
                <div className='popup-container'>
                    {renderContent()}
                </div>
            )}
        </>
    );
}

export default Popup;