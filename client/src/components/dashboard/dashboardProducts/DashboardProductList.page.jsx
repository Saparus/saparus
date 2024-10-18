import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import ProductList from "./ProductList"
import Categories from "../../catalog/categories"
import Companies from "../../catalog/companies"

const DashboardProductListPage = () => {
  const [filter, setFilter] = useState({})

  const { token } = useOutletContext()

  return (
    <>
      <Companies
        setFilter={setFilter}
        selectedCompany={filter.company}
      />
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
    </>
  )
}

export default DashboardProductListPage
