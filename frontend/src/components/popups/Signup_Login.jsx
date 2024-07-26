import React, { useState, useContext } from 'react';
import { register, login, logout } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import '../Component.css';

function Signup_Login() {
    // popupType = true : LOGIN POPUP
    // popupType = false : REGISTER POPUP
    const { loggedin, username, authDispatch } = useContext(AuthContext);
    const [popupType, setPopupType] = useState(true);

    const [loginFormData, setLoginFormData] = useState({
        identifier: '',
        password: ''
    });
    const [registerFormData, setRegisterFormData] = useState({
        username: '',
        email: '',
        new_password: ''
    })
    
    const handlePopupChange = () => {
        setPopupType(!popupType);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setLoginFormData({ ...loginFormData, [id]:value });
        setRegisterFormData({ ...registerFormData, [id]:value });
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

    // Register submition
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await register(registerFormData.email, registerFormData.username, registerFormData.new_password);
            console.log("Registration successful:", response.data);
        } catch (error) {
            console.log("Registration failed:", error);
        }
    }

    // Logout
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await logout();
            authDispatch({
                type: 'LOGOUT'
            })
            console.log("Logout successful:", response.data);
        } catch (error) {
            console.log("Logout failed:", error);
        }
    }

    return (
        <>
            {loggedin ?
                        <>
                            <h1>profile</h1>
                            <p>{username}</p>
                            <button onClick={handleLogout}>logout</button>
                        </>
                      :
                        <>
                        {/* Login Popup */}
                        {popupType === true && (
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
                        </>)}

                        {/* Register Popup */}
                        {popupType === false && (
                        <>
                            <h1 className='login-header'>register</h1>
                            <form autoComplete="off">
                                <input
                                    type="text"
                                    id="email"
                                    value={registerFormData.email}
                                    onChange={handleInputChange}
                                    placeholder='email'
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    type="text"
                                    id="username"
                                    value={registerFormData.username}
                                    onChange={handleInputChange}
                                    placeholder='username'
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    type="password"
                                    id="new_password"
                                    value={registerFormData.new_password}
                                    onChange={handleInputChange}
                                    placeholder='password'
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder='confirm password'
                                    autoComplete="off"
                                    required
                                />
                                <button type="submit" className="login-form-button" onClick={handleRegister}>sign up</button>
                            </form>
                            <div>
                                already have an account? 
                                <button className='login-register-button' onClick={handlePopupChange}>login</button>
                            </div>
                        </>)}
                        </>
            }
        </>
    );
}

export default Signup_Login;