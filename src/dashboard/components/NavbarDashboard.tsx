import CreateModalForm from "./CreateModalForm"

interface NavbarDashboardProps {
  handleSuccess : () => void;
  // onCreateSuccess : () => void;
}

const NavbarDashboard = ({ handleSuccess }: NavbarDashboardProps) => {
  return (
    <div className="w-full bg-orange-300">
      <div className="flex flex-row max-w-[1420px] items-center justify-between gap-10 mx-auto sticky top-0 left-0 py-6 px-6">
        <h4 className="text-xl md:text-3xl font-bold">
          ROTOARG DASHBOARD
        </h4>
        <CreateModalForm
          handleSuccess={handleSuccess}
          // onCreateSuccess={onCreateSuccess}
        />
      </div>
  </div>
  )
}

export default NavbarDashboard