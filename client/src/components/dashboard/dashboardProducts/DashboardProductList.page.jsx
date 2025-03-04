import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import ProductList from "./ProductList"
import Categories from "../../catalog/categories"
import Companies from "../../catalog/companies"

const DashboardProductListPage = () => {
  const [filter, setFilter] = useState({})

  const { apiKey } = useOutletContext()

  return (
    <>
      <Companies
        setFilter={setFilter}
        selectedCompany={filter?.categories?.company}
        apiKey={apiKey}
      />
      <div className="dashboard-products">
        <Categories
          setFilter={setFilter}
          showAddNewProductButton={true}
          selectedCompany={filter?.categories?.company}
        />
        <ProductList
          filter={filter}
          apiKey={apiKey}
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
