import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Latin-only subsets — the full stylesheets also pull in Devanagari.
// Saira Condensed for the category headers (matches the game's condensed
// display face); Rajdhani for body copy.
import '@fontsource/saira-condensed/latin-600.css'
import '@fontsource/saira-condensed/latin-700.css'
import '@fontsource/rajdhani/latin-400.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
