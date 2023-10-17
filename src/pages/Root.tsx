import { useQuerySideMenu } from "hook/useMenu";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    name: 'Administrator',
    url: 'administrator'
  },
  {
    name: 'Role',
    url: 'role',
  },
  {
    name: 'Permission',
    url: 'permission'
  },
  {
    name: 'Menu',
    url: 'menu'
  }
]

const Root = () => {
  const { data } = useQuerySideMenu()

  return (
    <div className='d-flex'>
      <div>
        {data?.getAllSideMenus && Object.entries(data.getAllSideMenus).map(([key, value]: any) => (
          <div key={key}>
            <h1>{key}</h1>
            <span>
              {value.map((menu: any) => (
                <div key={menu._id}>
                  <NavLink
                    key={menu.url}
                    style={({ isActive, isPending }) => {
                      return {
                        color: isActive ? "red" : "inherit",
                      };
                    }}
                    className={(({ isActive, isPending }) => {
                      return isActive ? "btn active" : isPending ? "pending" : "btn";
                    })}
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
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default Root