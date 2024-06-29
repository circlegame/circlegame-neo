import React, { useContext } from 'react';
import './App.css';
import GamemodeBar from './components/GamemodeBar';
import P5Wrapper from './components/P5Wrapper';
import { Provider } from './context/GamemodeContext';


function App() {

  return (
    <Provider>
      <GamemodeBar />
      <br></br>
      <br></br>
      <P5Wrapper/>
    </Provider>
  )
}

export default App