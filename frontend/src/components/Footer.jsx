import React, { useContext } from 'react';
import { GamemodeContext } from '../context/GamemodeContext';
import './Component.css';

function Footer() {
    const { gameState } = useContext(GamemodeContext);

    return (
        <div className='footer-container'>
            <div className={`footer ${gameState === 'pregame' || gameState === 'endgame' ? "" : 'hidden'}`}>
                <div className='footer-version'>
                    v1.0.0
                </div>
                <div className='footer-buttons'>
                    <button className='footer-button'>github</button>
                    <button className='footer-button'>contact</button>
                </div>
            </div>
        </div>
    );
}

export default Footer;