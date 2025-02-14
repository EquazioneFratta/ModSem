import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Home from './components/Home.tsx'
import Gui from './components/QueryTabs/JMQuery.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
