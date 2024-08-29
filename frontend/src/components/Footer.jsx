import React, { useContext } from 'react';
import { GamemodeContext } from '../context/GamemodeContext';
import { MenuContext } from '../context/MenuContext';
import styled from 'styled-components';

function Footer() {
    const { gameState } = useContext(GamemodeContext);
    const { menuDispatch } = useContext(MenuContext);

    const handleContact = () => {
        menuDispatch({
            type: 'OPEN_POPUP',
            payload: 'contact'
        })
    }

    return (
        <FooterContainer>
            <FooterDiv className={gameState === 'pregame' || gameState === 'endgame' ? "" : 'hidden'}>
                <Version>
                    v0.3.0
                </Version>
                <FooterButtons>
                    <a href="https://github.com/circlegame/circlegame-neo" target="_blank" rel="noreferrer noopener">
                        <FooterButton>github</FooterButton>
                    </a>
                    <FooterButton onClick={handleContact}>contact</FooterButton>
                </FooterButtons>
            </FooterDiv>
        </FooterContainer>
    );
}

export default Footer;

// Styling
const FooterContainer = styled.div`
    grid-row: 4 / 5;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: 20px;
    padding-bottom: 3vh;
`;

const FooterDiv = styled.div`
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

const Version = styled.div`
    display: inline-flex;
    align-items: center;
    margin-left: 16%;
    margin-right: auto;
    color: #666666;
    font-size: 17px;
    font-weight: 700;
`;

const FooterButtons = styled.div`
    margin-left: auto;
    margin-right: 16%;
    display: inline-flex;
`;

const FooterButton = styled.button`
    background-color: transparent;
    color: #666666;
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
    }
`;