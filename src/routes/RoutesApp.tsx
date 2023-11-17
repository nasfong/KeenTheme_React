import App from 'App'
import Layout from 'pages/Layout'
import Administrator from 'pages/administrator/Administrator'
import Customer from 'pages/customer/Customer'
import Menu from 'pages/menu/Menu'
import Permission from 'pages/permission/Permission'
import Role from 'pages/role/Role'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { usePermissions } from './PermissionsContext'
import { useEffect } from 'react'

const RoutesApp = () => {
  const { setPermissions } = usePermissions()
  useEffect(() => {
    setPermissions(['permission'])
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<App />} />
        <Route path='management' element={<Layout />}>
          <Route
            path='administrator'
            element={<PrivateRoute component={Administrator} requiredPermissions={['admin']} />}
          />
          <Route
            path='permission'
            element={<PrivateRoute component={Permission} requiredPermissions={['permission']} />}
          />
          {/* <Route path='administrator' element={<Administrator />} /> */}
          {/* <Route path='permission' element={<Permission />} /> */}
          <Route path='role' element={<Role />} />
          <Route path='menu' element={<Menu />} />
          <Route path='customer' element={<Customer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp
