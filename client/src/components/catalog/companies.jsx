import { useState } from "react"
import { useQuery } from "react-query"

import { ReactComponent as PlanmecaLogo } from "../../assets/companies/planmeca.svg"
import { getCategories } from "../../services/productServices"

import Loading from "../other/Loading"

const Companies = ({ setFilter, selectedCompany }) => {
  const { data, isLoading, error } = useQuery(["categories"], getCategories, {
    onSuccess: (fetchedData) => {},
  })

  const renderCompanies = () => {
    // if (isLoading) return <Loading />
    if (isLoading) return
    if (error || !data) return <div>something went wrong</div>

    const renderLogo = (company) => {
      switch (company) {
        case "planmeca":
          return <PlanmecaLogo className="logo" />
        default:
          return <PlanmecaLogo className="logo" />
      }
    }

    const { companies } = data

    return companies.map((company, index) => (
      <li
        key={index}
        className={`company ${company.name === selectedCompany ? "selected" : ""}`}
        onClick={() => {
          if (company.name !== selectedCompany) {
            setFilter({ company: company })
          } else {
            setFilter((prevState) => {
              const { company, ...newState } = prevState

              return newState
            })
          }
        }}
      >
        {renderLogo()}
        <span>{company.name}</span>
      </li>
    ))
  }

  return <ul className="companies">{renderCompanies()}</ul>
}

export default Companies
