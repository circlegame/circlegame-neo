import React, { useEffect, useContext } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import GamemodeBar from './components/GamemodeBar';
import P5Wrapper from './components/P5Wrapper';
import PostGame from './components/PostGame';
import Popup from './components/Popup';
import Footer from './components/Footer';
import { MenuContext } from './context/MenuContext';
import { AuthContext } from './context/AuthContext';
import { authRefresh } from './api';



function App() {
    const authContext = useContext(AuthContext);
    const menuContext = useContext(MenuContext);

    // On app mounted, use refresh token
    useEffect(async () => {
        const refreshAuthToken = async () => {
            try{
                const response = await authRefresh();
                authContext.authDispatch({
                    type: 'LOGIN',
                    payload: 'test username'
                });
                menuContext.menuDispatch({
                    type: 'SHOW_ALERT',
                    payload: {
                        type: 'success',
                        message: 'Login successful'
                    }
                });
            } catch (error) {
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