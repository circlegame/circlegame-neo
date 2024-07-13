import React, { useContext } from 'react';
import { Context } from '../context/GamemodeContext';
import './Component.css';

function NavBar() {
    const { gameState, dispatch } = useContext(Context);

    const handleLogoClick = () => {
        dispatch({type: 'RESET_GAME'})
    }

    return(
        <div className="navbar-container">
            <div className={`navbar ${gameState === 'pregame' || gameState === 'endgame' ? "" : 'hidden'}`}>
                <div className='navbar-logo' onClick={handleLogoClick}>
                    <img src='./circlegame.png' className='logo-image'/>
                    circlegame
                </div>
                <div className='navbar-buttons'>
                    <button className='navbar-button'>leaderboard</button>
                    <button className='navbar-button'>settings</button>
                    <button className='navbar-button'>info</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar;