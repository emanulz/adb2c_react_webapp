import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import App from './App'

import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './services/authConfig'

const root = ReactDOM.createRoot(document.getElementById('root'))

const msalInstance = new PublicClientApplication(msalConfig)
root.render(
  <React.StrictMode>
    <App instance={msalInstance} />
  </React.StrictMode>
)
