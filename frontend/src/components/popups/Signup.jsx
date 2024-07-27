import React, { useState, useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import { register } from '../../api';

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
        </>
    );
}

export default Signup;