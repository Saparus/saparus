import { useState } from "react"
import { useQuery } from "react-query"

import { ReactComponent as PlanmecaLogo } from "../../assets/companies/planmeca.svg"
import { ReactComponent as QuestionMark } from "../../assets/companies/undefined-company.svg"
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
          return <QuestionMark className="logo undefined-company" />
      }
    }

    const { companies } = data

    return companies.map((company, index) => (
      <li
        key={index}
        className={`company ${company.name === selectedCompany ? "selected" : ""}`}
        onClick={() => {
          if (company.name !== selectedCompany) {
            setFilter((prevState) => ({
              ...prevState,
              categories: { ...prevState.categories, company: company.name },
            }))
          } else {
            setFilter((prevState) => {
              const { categories, ...newState } = prevState
              const {} = categories

              return newState
            })
          }
        }}
      >
        {renderLogo(company.name)}
        <span>{company.name}</span>
      </li>
    ))
  }

  return <ul className="companies">{renderCompanies()}</ul>
}

export default Companies
