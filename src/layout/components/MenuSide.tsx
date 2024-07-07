import { NavLink } from "react-router-dom"

interface Props {
  sidebarMenu: Menu[] | undefined
}

export const MenuSide = ({ sidebarMenu }: Props) => {
  return (
    <>
      {sidebarMenu &&
        Object.entries(sidebarMenu).map(([key, value]: any) => (
          <div key={key}>
            <h1>{key}</h1>
            <span>
              {value.map((menu: any) => (
                <div key={menu._id}>
                  <NavLink
                    key={menu.url}
                    style={({ isActive }) => {
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
    </>
  )
}
