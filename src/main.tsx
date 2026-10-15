import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import App from './App'
import { StoreProvider } from './store/store'
import './styles/design-system.css'
import './styles/dashboard.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Toaster richColors position="top-right" closeButton />
        <App />
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
)