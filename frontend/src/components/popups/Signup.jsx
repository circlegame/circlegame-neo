import React, { useState, useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import { register } from '../../api';
import styled from 'styled-components';

function Signup() {
    const { menuDispatch } = useContext(MenuContext);

    const [registerFormData, setRegisterFormData] = useState({
        username: '',
        email: '',
        new_password: ''
    })

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setRegisterFormData({ ...registerFormData, [id]:value });
    };

    // Register submition
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await register(registerFormData.email, registerFormData.username, registerFormData.new_password);
            menuDispatch({
                type: 'OPEN_POPUP',
                payload: 'login'
            })
            console.log("Registration successful:", response.data);
        } catch (error) {
            console.log("Registration failed:", error);
        }
    }

    // Switch between login/signup popups
    const handlePopupChange = () => {
        menuDispatch({
            type: 'OPEN_POPUP',
            payload: 'login'
        })
    }

    return (
        <>
            <Header>register</Header>
            <RegisterForm autoComplete="off">
                <RegisterFormInput
                    type="text"
                    id="email"
                    value={registerFormData.email}
                    onChange={handleInputChange}
                    placeholder='email'
                    autoComplete="off"
                    required
                />
                <RegisterFormInput
                    type="text"
                    id="username"
                    value={registerFormData.username}
                    onChange={handleInputChange}
                    placeholder='username'
                    autoComplete="off"
                    required
                />
                <RegisterFormInput
                    type="password"
                    id="new_password"
                    value={registerFormData.new_password}
                    onChange={handleInputChange}
                    placeholder='password'
                    autoComplete="off"
                    required
                />
                <RegisterFormInput
                    type="password"
                    id="confirm-password"
                    placeholder='confirm password'
                    autoComplete="off"
                    required
                />
                <RegisterFormSubmit type="submit" className="login-form-button" onClick={handleRegister}>sign up</RegisterFormSubmit>
            </RegisterForm>

            already have an account? 
            <LoginButton className='login-register-button' onClick={handlePopupChange}>login</LoginButton>
        </>
    );
}

export default Signup;

// Styling
const Header = styled.h1`
    margin-bottom: 0;
`;

const RegisterForm = styled.form`
    display: grid;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 30px;
`;

const RegisterFormInput = styled.input`
    border: none;
    background: #2b2b2b;
    padding: 5px;
    border-radius: 5px;
    line-height: 1.5rem;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Inconsolata', monospace;
    width: 15rem;
`;

const RegisterFormSubmit = styled.button`
    width: 15rem;
    background-color: rgb(55, 55, 55);
    color: #949494;
    border: none;
    border-radius: 5px;
    outline: none;
    transition: color 0.3s, background-color 0.3s, transform 0.3s;

    &:hover{
        color: #e5e5e5;
        background-color: rgb(60, 60, 60);
    };
    &:focus{
        outline: none;
    };
`;

const LoginButton = styled.button`
    width: 8rem;
    background-color: rgb(47, 47, 47);
    color: #949494;
    border: none;
    border-radius: 5px;
    margin: 5px;
    outline: none;
    transition: color 0.3s, background-color 0.3s, transform 0.3s;

    &:hover{
        color: #e5e5e5;
        background-color: rgb(52, 52, 52);
    };
    &:focus{
        outline: none;
    };
`;