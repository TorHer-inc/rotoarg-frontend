import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-full bg-orange-500">
      <div className="flex flex-row max-w-[1420px] items-center justify-between gap-10 mx-auto sticky top-0 left-0 py-6 px-6">
        <NavLink
          className="text-xl md:text-3xl font-bold"
          to="/dashboard"
        >
          PANEL ADMINISTRATIVO
        </NavLink>
        <div className="hidden md:block">
          Enrique Herrera
        </div>
      </div>
    </div>
  )
}

export default Navbar

