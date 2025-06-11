import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"

import { getCompanies } from "../../services/categoryServices"

const Companies = ({ setFilter, selectedCompany, filter, apiKey }) => {
  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const { i18n } = useTranslation()

  const currentLanguage = i18n.language.split("-")[0]

  const { data, isLoading, error } = useQuery(["companies"], getCompanies)

  const renderCompanies = () => {
    // if (isLoading) return <Loading />
    if (isLoading) return
    if (error) return <div>something went wrong</div>
    if (!data) return

    const companies = data.value[currentLanguage]

    const renderLogo = (company) => {
      if (!company.name) return

      return (
        <img
          src={`https://saparus-images.s3.amazonaws.com/company_images/${company.name}/s.webp`}
          alt=""
          className="company-logo"
          onError={(e) =>
            (e.target.src =
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="50" fill="white"/><text x="50" y="54" font-size="65" text-anchor="middle" dominant-baseline="middle" fill="gainsboro" font-family="Arial, sans-serif">?</text></svg>')
          }
        />
      )
    }

    return companies?.map((company, index) => {
      if (company.amount === 0) return

      return (
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

                return newState
              })
            }
          }}
        >
          {renderLogo(company)}
          <span>{company.name}</span>
        </li>
      )
    })
  }

  return <ul className="companies">{renderCompanies()}</ul>
}

export default Companies
