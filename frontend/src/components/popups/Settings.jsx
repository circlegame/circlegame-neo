import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../context/UserContext';
import { MenuContext } from '../../context/MenuContext';
import { updateSettingAPI } from '../../api'; 

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

    const userContext = useContext(UserContext);
    const menuContext = useContext(MenuContext);

    const updateSetting = async (settingName, settingValue) => {
        userContext.userDispatch({
            type: 'UPDATE_SETTING',
            settingName: settingName,
            payload: settingValue
        });
        if (userContext.username){
            try{
                const response = await updateSettingAPI(settingName, settingValue);
            } catch(error){
                menuContext.menuDispatch({
                    type: 'SHOW_ALERT',
                    payload: {
                        type: 'error',
                        message: error.response.data.message 
                    }
                });
            }
            
        }
    }
    return (
        <div>
            <h1>settings</h1>
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
    background-color: ${props => props.isActive ? '#ffcc00' : '#444'};
    border: 1px solid ${props => props.isActive ? '#999900' : '#ccc'};
    border-radius: 0px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    &:hover {
        background-color: ${props => props.isActive ? '#ffcc00' : '#666'};
    }
`;