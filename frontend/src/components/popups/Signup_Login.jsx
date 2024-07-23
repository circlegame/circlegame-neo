import React, { useState } from 'react';
import '../Component.css';

function Signup_Login() {
    // popupType = true : LOGIN POPUP
    // popupType = false : REGISTER POPUP
    const [popupType, setPopupType] = useState(true);
    
    const handlePopupChange = () => {
        setPopupType(!popupType);
    };

    return (
        <>

            {/* Login Popup */}
            {popupType === true && (
            <>
                <h1 className='login-header'>login</h1>
                <form autoComplete="off">
                    <input
                        type="text"
                        id="username"
                        placeholder='username'
                        autoComplete="off"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder='password'
                        autoComplete="off"
                        required
                    />
                    <button type="submit" className="login-form-button">sign in</button>
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
                        placeholder='email'
                        autoComplete="off"
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        placeholder='username'
                        autoComplete="off"
                        required
                    />
                    <input
                        type="password"
                        id="password"
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
                    <button type="submit" className="login-form-button">sign up</button>
                </form>
                <div>
                    already have an account? 
                    <button className='login-register-button' onClick={handlePopupChange}>login</button>
                </div>
            </>)}
        </>
    );
}

export default Signup_Login;