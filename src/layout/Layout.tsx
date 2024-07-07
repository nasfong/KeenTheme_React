import { Suspense, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthSelector } from '../context/authentication/store'
import { useGlobalData } from '../context/other/GlobalDataProvider'
import { MenuSide } from './components/MenuSide'
import { useLogin } from '../hook/useLogin'
import { useQuerySideMenu } from '../hook/useMenu'
import useOnceCall from '../app/utils/useOneCall';
import { useApolloClient } from '@apollo/client'
const Layout = () => {
  const client = useApolloClient()
  const navigate = useNavigate()
  const { dispatch: dispatchRedux, state } = useAuthSelector((state) => state.auth)
  const { sidebarMenu, dispatch } = useGlobalData()
  const { data } = useQuerySideMenu()
  const [login] = useLogin()
  // console.log(state?.user)

  useEffect(() => {
    if (state?.token) dispatch({ type: 'SET_MENU', payload: data?.getAllSideMenus })
  }, [data?.getAllSideMenus, state?.token])


  useOnceCall(() => {
    if (state?.user) {
      const { user } = state
      login({
        variables: {
          input: {
            username: user.username,
            password: user.password
          }
        }
      })
        .then(res => {
          if (res.data?.login?.token) {
            dispatchRedux({ type: 'LOGIN', payload: { token: res.data.login.token } })
          } else if (res.data?.login?.message) {
            dispatch({ type: 'NOTIFY', payload: { status: 'warning', content: res.data.login.message } })
          }
        })
        .catch(e => dispatch({ type: 'NOTIFY', payload: { status: 'error', content: e.message } }))
    }
  }, true)

  const [countTime, setCountTime] = useState(Number(state?.user?.exp) - Number(state?.user?.iat))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountTime((s) => s - 1)
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const Logout = () => {
    dispatchRedux({ type: 'LOGOUT' })
    dispatch({ type: 'NOTIFY', payload: { status: 'open', content: 'I hope you will be back. have a good day :)' } })
    navigate('/login')
  }
  return (
    <div className='d-flex'>
      <div className='bg-white px-10 p-5'>
        {countTime}
        <MenuSide sidebarMenu={sidebarMenu} />
        <button
          className='btn btn-light-primary w-100'
          onClick={Logout}
        >Logout</button>
      </div>
      <div className='container'>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default Layout
