import React from 'react';
import './App.css';
import GamemodeBar from './components/GamemodeBar';
import P5Wrapper from './components/P5Wrapper';
import PostGame from './components/PostGame';
import { Provider } from './context/GamemodeContext';


function App() {

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Provider>
        <PostGame/>
        <GamemodeBar/>
        <br/>
        <P5Wrapper/>
      </Provider>
    </div>
  )
}

export default App