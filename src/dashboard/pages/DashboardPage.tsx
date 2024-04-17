import TableDashboard from "../components/TableDashboard"

const DashboardPage = () => {
  return (
    <div className="pt-10 max-w-[1420px] flex flex-col mx-auto gap-8 p-6">
      <h1 className="text-center font-bold text-4xl">DashboardPage</h1>
      <TableDashboard />
    </div>
  )
}

export default DashboardPage