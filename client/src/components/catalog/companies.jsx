import { useQuery } from "react-query"

import { ReactComponent as Logo } from "../../assets/companies/planmeca.svg"
import { categories } from "../../data/products"

const Companies = ({ setFilter, selectedCompany }) => {
  const companies = categories("company")
  return (
    <ul className="companies">
      {companies.map((company, index) => (
        <li
          key={index}
          className={`company ${company === selectedCompany ? "selected" : ""}`}
          onClick={() => {
            if (company !== selectedCompany) {
              setFilter({ company: company })
            } else {
              setFilter((prevState) => {
                const { company, ...newState } = prevState

                return newState
              })
            }
          }}
        >
          <Logo className="logo" />
          <span>{company}</span>
        </li>
      ))}
    </ul>
  )
}

export default Companies
