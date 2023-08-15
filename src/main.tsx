import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

//? Theme Animation
import { MasterInit } from './_metronic/layout/MasterInit.tsx'
//? Translations
import { I18nextProvider } from 'react-i18next';
import i18n from './_metronic/i18n/i18n.ts';

//? Theme style (Bootstrap + Scss)
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'
// import './_metronic/assets/sass/style.dark.scss'
// import './_metronic/assets/sass/plugins.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MasterInit>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <App />
      </I18nextProvider>
    </MasterInit>
  </React.StrictMode>,
)
