import React from 'react';
import styled from 'styled-components';

function Contact() {

    return (
        <>
            <Header>
                contact
            </Header>

            <Divider/>

            <ContactBody>
                If you have any questions, feedback, bug reports, or need help, you can send an email to <Emphasize>devcirclegame@gmail.com</Emphasize>
            </ContactBody>
        </>
    );
}

export default Contact;

const Header = styled.h1`
    margin-bottom: 10px;
`;

const ContactBody = styled.div`
    padding: 30px;
`;

const Emphasize = styled.b`
    font-weight: 700;
    font-size: 20px;
`;

const Divider = styled.div`
    width: 50%;
    height: 4px;
    background-color: #2b2b2b;
    margin: 0 10px;
    border-radius: 30px;
    align-self: center;
    justify-self: center; 
`;