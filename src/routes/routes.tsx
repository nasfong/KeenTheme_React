import App from 'App'
import Root from 'pages/Root'
import Administrator from 'pages/administrator/Administrator'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'management',
    element: <Root />,
    children: [
      {
        path: 'administrator',
        element: <Administrator />
      }
    ]
  }
])



