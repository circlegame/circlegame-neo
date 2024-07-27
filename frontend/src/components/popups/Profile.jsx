import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../api';

function Profile() {
    const { username, authDispatch } = useContext(AuthContext);

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
            <h1>profile</h1>
            <p>{username}</p>
            <button onClick={handleLogout}>logout</button>
        </>
    );
}

export default Profile;