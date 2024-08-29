import React, { useEffect, useContext } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import GamemodeBar from './components/GamemodeBar';
import P5Wrapper from './components/P5Wrapper';
import PostGame from './components/PostGame';
import Popup from './components/Popup';
import Footer from './components/Footer';
import { MenuContext } from './context/MenuContext';
import { UserContext } from './context/UserContext';
import { authRefresh, getScoresByUsername, getSettingsByUsername } from './api';



function App() {
    const userContext = useContext(UserContext);
    const menuContext = useContext(MenuContext);

    // On app mounted, use refresh token
    useEffect(() => {
        const refreshAuthToken = async () => {
            try{
                // Call refresh endpoint
                const refreshResponse = await authRefresh();

                // If here, successful, log user in
                const settingsResponse = await getSettingsByUsername(refreshResponse.data.usernameDisplay.toLowerCase());
                const scoresRepsonse = await getScoresByUsername(refreshResponse.data.usernameDisplay.toLowerCase());
    
                userContext.userDispatch({
                    type: 'LOGIN',
                    payload: {
                        username: refreshResponse.data.usernameDisplay,
                        settings: settingsResponse.data,
                        scores: scoresRepsonse.data
                    }
                });

                // Show successful login alert popup
                menuContext.menuDispatch({
                    type: 'SHOW_ALERT',
                    payload: {
                        type: 'success',
                        message: 'Login successful'
                    }
                });
            } catch (error) {
                // If here, refresh failed, open login popup
                console.log(error);
                menuContext.menuDispatch({
                    type: 'OPEN_POPUP',
                    payload: 'login'
                });
            }
        }
        refreshAuthToken();
    }, []);

    return (
        <div className='App'>
            <Popup/>
            <NavBar/>

            <GamemodeBar/>

            <div className='main-content'>
                <PostGame/>
                <P5Wrapper/>
            </div>

            <Footer/>
        </div>
    )
}

export default App;