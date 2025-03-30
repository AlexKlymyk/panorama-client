import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './plugins/i18n'
import './assets/styles/fonts.css'
import './assets/styles/index.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
