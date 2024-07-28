import React, { useContext } from 'react';
import { GamemodeContext } from '../context/GamemodeContext';
import { MenuContext } from '../context/MenuContext';
import { AuthContext } from '../context/AuthContext';
import './Component.css';

function NavBar() {
    const { gameState, gamemodeDispatch } = useContext(GamemodeContext);
    const { menuDispatch } = useContext(MenuContext);
    const { loggedin } = useContext(AuthContext);

    const handleLogoClick = () => {
        gamemodeDispatch({type: 'RESET_GAME'})
    }

    const handleOpenPopup = (data) => {
        menuDispatch({
            type: 'OPEN_POPUP',
            payload: data
        })
    }

    return(
        <div className="navbar-container">
            <div className={`navbar ${gameState === 'pregame' || gameState === 'endgame' ? "" : 'hidden'}`}>
                <div className='navbar-logo' onClick={handleLogoClick}>
                    <img src='./circlegame.png' className='logo-image'/>
                    circlegame
                </div>
                <div className='navbar-buttons'>
                    <button className='navbar-button' onClick={() => handleOpenPopup('leaderboard')}>leaderboard</button>
                    <button className='navbar-button' onClick={() => handleOpenPopup('settings')}>settings</button>
                    <button className='navbar-button' onClick={() => handleOpenPopup('info')}>info</button>
                    {loggedin ? <button className='navbar-button' onClick={() => handleOpenPopup('profile')}>profile</button>
                              : <button className='navbar-button' onClick={() => handleOpenPopup('login')}>login</button> }
                    
                </div>
            </div>
        </div>
    )
}

export default NavBar;