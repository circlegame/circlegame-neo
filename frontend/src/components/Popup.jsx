import React, { useContext, useEffect } from 'react';
import { MenuContext } from '../context/MenuContext';
import Leaderboard from './popups/Leaderboard';
import Settings from './popups/Settings';
import Info from './popups/Info';
import './Component.css';

function Popup() {
    const { menuDispatch, popup } = useContext(MenuContext);

    // Choose which popup to render
    const renderContent = () => {
        switch(popup.type){
            case 'leaderboard':
                return <Leaderboard/>;
            case 'settings':
                return <Settings/>;
            case 'info':
                return <Info/>;
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
        
    return (
        <>
            {popup.visible && (
                <div className='popup-container'>
                    <div className='popup-content'>
                        {renderContent()}
                        <button onClick={handleClose}>close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Popup;