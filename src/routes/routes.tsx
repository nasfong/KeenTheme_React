// import { lazy } from 'react';
// import { createBrowserRouter } from 'react-router-dom'
// import { PrivateRoute } from './PrivateRoute'
// import Chakra from 'src/pages/chakra/Chakra'
// import { ChakraProvider } from '@chakra-ui/react';
// import { theme } from 'src/config/chakraTheme'

// const App = lazy(() => import('App'))
// const Layout = lazy(() => import('src/layout/Layout'))
// const Administrator = lazy(() => import('pages/administrator/Administrator'))
// const Customer = lazy(() => import('pages/customer/Customer'))
// const Menu = lazy(() => import('pages/menu/Menu'))
// const Permission = lazy(() => import('pages/permission/Permission'))
// const Role = lazy(() => import('pages/role/Role'))
// // import { Error404 } from 'app/modules/errors/components/Error404'

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: 'management',
//     element: <Layout />,
//     // errorElement: <Error404 />,
//     children: [
//       {
//         path: 'administrator',
//         element: <PrivateRoute component={Administrator} requiredPermissions={['admin']} />,
//       },
//       {
//         path: 'role',
//         element: <Role />,
//       },
//       {
//         path: 'permission',
//         element: <Permission />,
//       },
//       {
//         path: 'menu',
//         element: <Menu />,
//       },
//       {
//         path: 'customer',
//         element: <Customer />,
//       },
//       {
//         path: 'chakra-ui',
//         element:
//           <ChakraProvider theme={theme}>
//             <Chakra />
//           </ChakraProvider>
//       }
//     ],
//   },
// ], {
//   basename: '/'
// })
