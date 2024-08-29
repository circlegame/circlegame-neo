import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GamemodeProvider } from './context/GamemodeContext';
import { MenuProvider } from './context/MenuContext';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GamemodeProvider><MenuProvider><UserProvider>
      <App />
    </UserProvider></MenuProvider></GamemodeProvider>
  </React.StrictMode>,
)
