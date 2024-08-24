import React, { useContext, useCallback, useState } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';
import debounce from 'lodash.debounce';
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

    // For volume sliders, use intermediate state for better rendering (lodash.debounce lags ui, do that in background)
    const [masterVolume, setMasterVolume] = useState(userContext.settings.masterVolume);
    const [hitSoundVolume, setHitSoundVolume] = useState(userContext.settings.hitSoundVolume);

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

    const debouncedUpdateSetting = useCallback(debounce(async (settingName, settingValue) => {
        await updateSetting(settingName, settingValue);
    }, 250), [userContext, menuContext]);


    return (
        <div>
            <h1>settings</h1>

            <SliderContainer>
                <label>Master Volume: {masterVolume}%</label>
                <StyledSlider
                    value={masterVolume}
                    onChange={(value) => {
                        setMasterVolume(value);
                        debouncedUpdateSetting('masterVolume', value);
                    }}
                    min={0}
                    max={100}
                    thumbClassName="thumb"
                    trackClassName="track"
                />
            </SliderContainer>

            <SliderContainer>
                <label>Hit Sound Volume: {hitSoundVolume}%</label>
                <StyledSlider
                    value={hitSoundVolume}
                    onChange={(value) => {
                        setHitSoundVolume(value);
                        debouncedUpdateSetting('hitSoundVolume', value);
                    }}
                    min={0}
                    max={100}
                    thumbClassName="thumb"
                    trackClassName="track"
                />
            </SliderContainer>
            


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

const SliderContainer = styled.div`
    margin: 50px 50px;

`;

const StyledSlider = styled(ReactSlider)`
    .track {
        background: #ddd;
        height: 4px;
        margin-top: 10px;
    }

    .thumb {
        background: #888;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        cursor: grab;
        margin-top: 4px;
    }
`;