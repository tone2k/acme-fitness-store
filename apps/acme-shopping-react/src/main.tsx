import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import AppProvider from "./AppProvider";
import AppRoutes from "./Routes";

import "./tailwind.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppProvider>
        <AppRoutes/>
      </AppProvider>
  </StrictMode>
)
