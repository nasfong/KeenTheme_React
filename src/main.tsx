import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'
// import './_metronic/assets/sass/style.dark.scss'
// import './_metronic/assets/sass/plugins.scss'

import { MasterInit } from './_metronic/layout/MasterInit.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MasterInit>
      <App />
    </MasterInit>
  </React.StrictMode>,
)
