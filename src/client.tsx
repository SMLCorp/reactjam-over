import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

Rune.initClient({
  onChange: ({ game, players, yourPlayerId }) => {
    console.log('rune onChange');
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)