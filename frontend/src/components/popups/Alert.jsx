import React, { useContext, useEffect } from 'react';
import { MenuContext } from '../../context/MenuContext';
import styled from 'styled-components';

function Alert() {
    const { alert, menuDispatch } = useContext(MenuContext);

    // Alert will disappear after a given amount of time
    useEffect(() => {
        // If the alert is a success message, it will disappear after 3 seconds, else after 10 seconds
        const timeoutDuration = alert.type === 'success' ? 3000 : 10000;

        const timer = setTimeout(() => {
            handleClose();
        }, timeoutDuration);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        menuDispatch({
            type: 'CLOSE_ALERT'
        });
    };

    return (
        <>
            <AlertContainer className={alert.type} >
                {alert.message}

                <CloseButton 
                    onClick={handleClose}
                    className={alert.type}
                      >
                        x
                      </CloseButton>
            </AlertContainer>
        </>
    );
}

export default Alert;

// Styling
const AlertContainer = styled.div`
    background: #242424;
    padding: 20px;
    border-radius: 10px;
    outline-style: solid;
    outline-width: 2px;
    max-width: 300px;
    position: absolute;
    bottom: 10vh;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1001;

    &.success{
        background: #2a912a;
        outline-color: #014d01;
    };
    &.error{
        background: #b81111;
        outline-color: #630101;
    };
    &.other{
        background: #1e51fa;
    };
`;

const CloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 6px;
    padding: 0;
    background-color: transparent;
    border: none;

    &.success{
        color: #1f6b1f;
    };
    &.error{
        color: #8a0101;
    };
    &.other{
        color: white;
    };

    &:hover{
    color: #dddddd;
    }
    &:focus{
        outline: none;
    }
`;