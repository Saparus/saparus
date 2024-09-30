import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import ProductList from "./ProductList"
import Categories from "../../catalog/categories"

const DashboardProductListPage = () => {
  const [filter, setFilter] = useState({})

  const { token } = useOutletContext()

  return (
    <div className="dashboard-products">
      <Categories
        setFilter={setFilter}
        showAddNewProductButton={true}
      />
      <ProductList
        filter={filter}
        token={token}
        resetFilter={(event) => {
          event.preventDefault()
          setFilter({})
        }}
      />
    </div>
  )
}

export default DashboardProductListPage
