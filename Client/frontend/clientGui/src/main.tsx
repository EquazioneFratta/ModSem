import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Gui from './components/Gui.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gui />
  </StrictMode>,
)
