import TableProducts from "../components/TableProducts"

const ProductsPage = () => {
  return (
    <div className="pt-10 max-w-[1420px] flex flex-col mx-auto gap-8 p-6">
      <h1 className="text-center font-bold text-4xl" >Lista de precios RotoArg</h1>
      <TableProducts />
    </div>
  )
}

export default ProductsPage