import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    name: 'Administrator',
    url: 'administrator'
  }
]

const Root = () => {
  return (
    <div>
      Management
      {links.map(link => (
        <NavLink
          key={link.url}
          style={({ isActive, isPending }) => {
            return {
              color: isActive ? "red" : "inherit",
            };
          }}
          className={(({ isActive, isPending }) => {
            return isActive ? "btn active" : isPending ? "pending" : "btn";
          })}
          to={link.url}
        >
          {link.name}
        </NavLink>
      ))}
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default Root