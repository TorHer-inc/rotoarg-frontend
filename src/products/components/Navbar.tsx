import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-full bg-orange-500">
      <div className="flex flex-row max-w-[1420px] gap-10 mx-auto sticky top-0 left-0 py-6 px-6">
        <NavLink
          className="text-3xl font-bold"
          to="/dashboard"
        >
          DASHBOARD
        </NavLink>
        <NavLink
          className="text-3xl font-bold"
          to="/dashboard"
        >
          DASHBOARD
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar

