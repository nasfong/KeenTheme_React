import { useAuthSelector } from 'helpers/store'
import { useQuerySideMenu } from 'hook/useMenu'
import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
  // const state = useAuthSelector((state) => state.counter)
  // console.log(state)
  const { data, error, loading } = useQuerySideMenu()

  if (error) return <div>{JSON.stringify(error)}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div className='d-flex'>
      <div>
        {data?.getAllSideMenus &&
          Object.entries(data.getAllSideMenus).map(([key, value]: any) => (
            <div key={key}>
              <h1>{key}</h1>
              <span>
                {value.map((menu: any) => (
                  <div key={menu._id}>
                    <NavLink
                      key={menu.url}
                      style={({ isActive, isPending }) => {
                        return {
                          color: isActive ? 'red' : 'inherit',
                        }
                      }}
                      className={({ isActive, isPending }) => {
                        return isActive ? 'btn active' : isPending ? 'pending' : 'btn'
                      }}
                      to={menu.url}
                    >
                      {menu.name}
                    </NavLink>
                  </div>
                ))}
              </span>
            </div>
          ))}
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
