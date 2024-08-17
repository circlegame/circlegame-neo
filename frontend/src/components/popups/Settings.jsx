import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../context/UserContext';

// Define the hitSounds object
const hitSounds = {
    "bah": "bah.wav",
    "beow": "beow.wav",
    "bonk": "bonk.wav",
    "clack": "clack.wav",
    "cling": "cling.wav",
    "cod": "cod.wav",
    "fing": "fing.wav",
    "pew": "pew.wav",
    "ping": "ping.wav",
    "plop": "plop.wav",
    "swich": "swich.wav",
    "tic": "tic.wav",
    "pop1": "pop1.wav",
    "pop2": "pop2.wav",
    "pop3": "pop3.wav",
    "pop4": "pop4.wav",
};

// Main component
function Settings() {

    const userContext = useContext(UserContext)

    const updateSetting = (settingName, settingValue) => {
        userContext.userDispatch({
            type: 'UPDATE_SETTING',
            settingName: settingName,
            payload: settingValue
        });
    }
    return (
        <div>
            <h1>Settings</h1>
            <SoundsContainer>
                <h2>Hit Sounds:</h2>
                <SoundsGrid>
                    {Object.keys(hitSounds).map((sound) => (
                        <SoundsButton 
                            key={sound}
                            onClick={() => updateSetting('hitSound', hitSounds[sound])}
                            isActive={hitSounds[sound] === userContext.settings.hitSound}
                        >
                            {sound}
                        </SoundsButton>
                    ))}
                </SoundsGrid>
            </SoundsContainer>
        </div>
    );
}

export default Settings;


//-----Styles-----//
const SoundsContainer = styled.div`
    h2 {
        text-align: left;
        margin: 0px;
        margin-left: 20px;
    }
`;

const SoundsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0px;
    padding: 10px;
`;

const SoundsButton = styled.div`
    background-color: ${props => props.isActive ? '#ffcc00' : '#aaaaaa'};
    border: 1px solid ${props => props.isActive ? '#999900' : '#ccc'};
    border-radius: 0px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    &:hover {
        background-color: ${props => props.isActive ? '#ffcc00' : '#ddd'};
    }
`;