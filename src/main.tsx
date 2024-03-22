import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Auth } from './pages/Auth/Auth.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme preset={presetGpnDefault}>
      {
        localStorage.getItem('user') ? <App /> : <Auth />
      }
    </Theme>
  </React.StrictMode>,
)
