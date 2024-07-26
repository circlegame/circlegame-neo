import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import GamemodeBar from './components/GamemodeBar';
import P5Wrapper from './components/P5Wrapper';
import PostGame from './components/PostGame';
import Popup from './components/Popup';
import Footer from './components/Footer';
import { GamemodeProvider } from './context/GamemodeContext';
import { MenuProvider } from './context/MenuContext';
import { AuthProvider } from './context/AuthContext';


function App() {

    return (
        <div className='App'>
            <GamemodeProvider><MenuProvider><AuthProvider>

                <Popup/>
                <NavBar/>

                <GamemodeBar/>

                <div className='main-content'>
                    <PostGame/>
                    <P5Wrapper/>
                </div>

                <Footer/>
                
                </AuthProvider></MenuProvider></GamemodeProvider>
        </div>
    )
}

export default App