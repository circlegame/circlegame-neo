import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import GamemodeBar from './components/GamemodeBar';
import P5Wrapper from './components/P5Wrapper';
import PostGame from './components/PostGame';
import { Provider } from './context/GamemodeContext';


function App() {

  return (
    <div className='App'>
      <Provider>
        <NavBar/>
        <GamemodeBar/>
        <div className='main-content'>
          <PostGame/>
          <P5Wrapper/>
        </div>
      </Provider>
    </div>
  )
}

export default App