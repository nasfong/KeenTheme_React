import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../config/chakraTheme'
import { useAuthSelector } from '../context/authentication/store'
import { GlobalDataProvider } from '../context/other/GlobalDataProvider'
import { PermissionProvider } from './PermissionsContext'
import { PrivateRoute } from './PrivateRoute'

// page
const Login = lazy(() => import('../pages/Login/Login'))
const Chakra = lazy(() => import('../pages/chakra/Chakra'))
const App = lazy(() => import('../App'))
const Layout = lazy(() => import('../layout/Layout'))
const Administrator = lazy(() => import('../pages/administrator/Administrator'))
const Customer = lazy(() => import('../pages/customer/Customer'))
const Menu = lazy(() => import('../pages/menu/Menu'))
const Permission = lazy(() => import('../pages/permission/Permission'))
const Role = lazy(() => import('../pages/role/Role'))
const AntDesign = lazy(() => import('../pages/ant-design/AntDesign'))
const ShadcnUI = lazy(() => import('../pages/shadcn-ui/ShadcnUI'))


const RoutesApp = () => {
  const { state } = useAuthSelector((state) => state.auth)
  return (
    <BrowserRouter>
      <GlobalDataProvider>
        <PermissionProvider>
          <Routes>
            <Route path='' element={<App />} />
            {!state?.token ? (
              <>
                <Route path='login' element={<Login />} />
                <Route
                  path="management"
                  element={<Navigate to="/login" replace />}
                />
              </>
            ) : (
              <Route path='management' element={<Layout />}>
                <Route
                  path='administrator'
                  element={<PrivateRoute component={Administrator} requiredPermissions={['admin']} />}
                />
                <Route
                  path='permission'
                  element={<PrivateRoute component={Permission} requiredPermissions={['permission']} />}
                />
                <Route path='role' element={<Role />} />
                <Route path='menu' element={<Menu />} />
                <Route path='customer' element={<Customer />} />
                <Route
                  path='chakra-ui'
                  element={
                    <ChakraProvider theme={theme}>
                      <Chakra />
                    </ChakraProvider>
                  }
                />
                <Route path='ant-design' element={<AntDesign />} />
                <Route path='shadcn-ui' element={<ShadcnUI />} />
              </Route>
            )}
            <Route path='*' element={<>Error</>} />
          </Routes>
        </PermissionProvider>
      </GlobalDataProvider>
    </BrowserRouter >
  )
}

export default RoutesApp
