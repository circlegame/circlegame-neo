import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GamemodeProvider } from './context/GamemodeContext';
import { MenuProvider } from './context/MenuContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GamemodeProvider><MenuProvider><AuthProvider>
      <App />
    </AuthProvider></MenuProvider></GamemodeProvider>
  </React.StrictMode>,
)
