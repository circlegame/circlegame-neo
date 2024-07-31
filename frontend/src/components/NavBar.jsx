import React, { useContext } from 'react';
import { GamemodeContext } from '../context/GamemodeContext';
import { MenuContext } from '../context/MenuContext';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';

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
        <NavBarContainer>
            <NavBarDiv className={gameState === 'pregame' || gameState === 'endgame' ? "" : 'hidden'}>
                
                <Logo onClick={handleLogoClick}>
                    <LogoImage src='./circlegame.png' />
                    circlegame
                </Logo>

                <NavBarButtons>
                    <NavBarButton onClick={() => handleOpenPopup('leaderboard')}>leaderboard</NavBarButton>
                    <NavBarButton onClick={() => handleOpenPopup('settings')}>settings</NavBarButton>
                    <NavBarButton onClick={() => handleOpenPopup('info')}>info</NavBarButton>
                    {loggedin ? <NavBarButton onClick={() => handleOpenPopup('profile')}>profile</NavBarButton>
                              : <NavBarButton onClick={() => handleOpenPopup('login')}>login</NavBarButton> }   
                </NavBarButtons>

            </NavBarDiv>
        </NavBarContainer>
    )
}

export default NavBar;

// Styling
const NavBarContainer = styled.div`
    grid-row: 1 / 2;
    width: 100%;
    margin-top: 3vh;
`;

const NavBarDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

    &.hidden{
        opacity: 0;
        visibility: hidden;
    };
`;

const Logo = styled.div`
    display: inline-flex;
    align-items: center;
    margin-left: 5%;
    margin-right: auto;
    font-size: 54px;
    font-weight: 600;
    color: #e5e5e5;
    cursor: pointer;
`;

const LogoImage = styled.img`
    width: 48px;
    height: 48px;
    margin-right: 10px;
`;

const NavBarButtons = styled.div`
    margin-left: auto;
    margin-right: 5%;
    display: inline-flex;
`;

const NavBarButton = styled.button`
    background-color: #2b2b2b;
    color: #949494;
    border: none;
    padding: 8px 20px;
    margin: 0 5px;
    border-radius: 5px;
    outline: none;
    transition: color 0.3s, transform 0.3s;

    &:hover{
        color: #e5e5e5;
    };
    &:focus{
        outline: none;
    };
`;