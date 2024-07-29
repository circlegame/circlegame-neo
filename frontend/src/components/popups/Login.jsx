import React, { useState, useContext } from 'react';
import { login } from '../../api';
import { MenuContext } from '../../context/MenuContext';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';

function Login() {
    const { authDispatch } = useContext(AuthContext);
    const { menuDispatch } = useContext(MenuContext);

    const [loginFormData, setLoginFormData] = useState({
        identifier: '',
        password: ''
    });
    
    // Switch between login/signup popups
    const handlePopupChange = () => {
        menuDispatch({
            type: 'OPEN_POPUP',
            payload: 'signup'
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setLoginFormData({ ...loginFormData, [id]:value });
    };

    // Login submition
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(loginFormData.identifier, loginFormData.password);
            authDispatch({
                type: 'LOGIN',
                payload: loginFormData.identifier
            });
            menuDispatch({
                type: 'CLOSE_POPUP'
            });
            menuDispatch({
                type: 'SHOW_ALERT',
                payload: {type: 'success',
                          message: 'Login Successful!' }
            })
        } catch (error) {
            menuDispatch({
                type: 'SHOW_ALERT',
                payload: {type: 'error',
                          message: error.response.data.message }
            })
        }
    };

    return (
        <>
            <Header>login</Header>
            <LoginForm autoComplete="off">
                <LoginFormInput
                    type="text"
                    id="identifier"
                    value={loginFormData.identifier}
                    onChange={handleInputChange}
                    placeholder="username or email"
                    autoComplete="off"
                    required
                />
                <LoginFormInput
                    type="password"
                    id="password"
                    value={loginFormData.password}
                    onChange={handleInputChange}
                    placeholder='password'
                    autoComplete="off"
                    required
                />
                <LoginFormSubmit type="submit" className="login-form-button" onClick={handleLogin}>sign in</LoginFormSubmit>
            </LoginForm>
            
            don't have an account? 
            <RegisterButton onClick={handlePopupChange}>register</RegisterButton>
        </>
    );
}

export default Login;

// Styling
const Header = styled.h1`
    margin-bottom: 0;
`;

const LoginForm = styled.form`
    display: grid;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 30px;
`;

const LoginFormInput = styled.input`
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

const LoginFormSubmit = styled.button`
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

const RegisterButton = styled.button`
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