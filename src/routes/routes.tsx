
import App from 'App'
import Root from 'pages/Root'
import Administrator from 'pages/administrator/Administrator'
import Menu from 'pages/menu/Menu'
import Permission from 'pages/permission/Permission'
import Role from 'pages/role/Role'
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
      },
      {
        path: 'role',
        element: <Role />
      },
      {
        path: 'permission',
        element: <Permission />
      },
      {
        path: 'menu',
        element: <Menu />
      }
    ]

  }
])



