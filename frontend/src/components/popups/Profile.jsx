import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MenuContext } from '../../context/MenuContext';
import { logout } from '../../api';

function Profile() {
    const { username, authDispatch } = useContext(AuthContext);
    const { menuDispatch } = useContext(MenuContext);

    // Logout
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await logout();
            authDispatch({
                type: 'LOGOUT'
            })
            menuDispatch({
                type: 'OPEN_POPUP',
                payload: 'login'
            })
            menuDispatch({
                type: 'SHOW_ALERT',
                payload: {type: 'success',
                          message: 'Logout Successful!' }
            })
        } catch (error) {
            menuDispatch({
                type: 'SHOW_ALERT',
                payload: {type: 'error',
                          message: error.response.data.message }
            })
        }
    }

    return (
        <>
            <h1>profile</h1>
            <p>{username}</p>
            <button onClick={handleLogout}>logout</button>
        </>
    );
}

export default Profile;