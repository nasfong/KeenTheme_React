import App from 'App'
import { Error404 } from 'app/modules/errors/components/Error404'
import Layout from 'pages/Layout'
import Administrator from 'pages/administrator/Administrator'
import Customer from 'pages/customer/Customer'
import Menu from 'pages/menu/Menu'
import Permission from 'pages/permission/Permission'
import Role from 'pages/role/Role'
import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'management',
    element: <Layout />,
    // errorElement: <Error404 />,
    children: [
      {
        path: 'administrator',
        element: (
          <PrivateRoute
            component={Administrator}
            requiredPermissions={['admin', 'permission']}
          />
        ),
      },
      {
        path: 'role',
        element: <Role />,
      },
      {
        path: 'permission',
        element: <Permission />,
      },
      {
        path: 'menu',
        element: <Menu />,
      },
      {
        path: 'customer',
        element: <Customer />,
      },
    ],
  },
])
