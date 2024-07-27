import React, { useState, useContext } from 'react';
import { login } from '../../api';
import { MenuContext } from '../../context/MenuContext';
import { AuthContext } from '../../context/AuthContext';
import '../Component.css';

function Login() {
    // popupType = true : LOGIN POPUP
    // popupType = false : REGISTER POPUP
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
        })
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
            })
            console.log("Login successful:", response.data);
        } catch (error) {
            console.error('Login Failed:', error);
        }
    };

    return (
        <>
            <h1 className='login-header'>login</h1>
            <form autoComplete="off">
                <input
                    type="text"
                    id="identifier"
                    value={loginFormData.identifier}
                    onChange={handleInputChange}
                    placeholder="username or email"
                    autoComplete="off"
                    required
                />
                <input
                    type="password"
                    id="password"
                    value={loginFormData.password}
                    onChange={handleInputChange}
                    placeholder='password'
                    autoComplete="off"
                    required
                />
                <button type="submit" className="login-form-button" onClick={handleLogin}>sign in</button>
            </form>
            <div>
                don't have an account? 
                <button className='login-register-button' onClick={handlePopupChange}>register</button>
            </div>
        </>
    );
}

export default Login;