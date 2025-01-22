import { useQuery, useMutation, useQueryClient } from "react-query"
import { useState } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

import { ReactComponent as PlanmecaLogo } from "../../assets/companies/planmeca.svg"
import { ReactComponent as QuestionMark } from "../../assets/companies/undefined-company.svg"
import { getCategories, editCategories } from "../../services/categoryServises"

const Companies = ({ setFilter, selectedCompany, apiKey }) => {
  const [newCompanyName, setNewCompanyName] = useState("")
  const [companyImage, setCompanyImage] = useState("")

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const { data, isLoading, error } = useQuery(["categories"], getCategories)

  const categories = data

  const queryClient = useQueryClient()

  const handleChangeNewCompanyName = (e) => {
    setNewCompanyName(e.target.value)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result
        setCompanyImage(newImage)
      }
      reader.readAsDataURL(file)
    }
  }

  const addCategoryMutation = useMutation({
    mutationFn: async (newCompany) => {
      const newCategories = [
        ...categories,
        {
          en: {
            company: [...categories.companies, { name: newCompany.name, image: newCompany.image }],
          },
          ru: {
            company: [...categories.companies, { name: newCompany.name }],
          },
          ka: {
            company: [...categories.companies, { name: newCompany.name }],
          },
        },
      ]

      return await editCategories(newCategories, apiKey)
    },
    onMutate: () => {
      // showing loading toast when the mutation starts
      toast.loading(t("Adding company..."))
    },
    onSuccess: (data) => {
      // updating the toast to success
      toast.dismiss()
      toast.success(t("Successfully added company"))

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("categories"),
      })
    },
    onError: (error) => {
      // updating the toast to error
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong"

      toast.dismiss()
      toast.error(errorMessage)
      console.log(errorMessage)
    },
  })

  const renderCompanies = () => {
    // if (isLoading) return <Loading />
    if (isLoading) return
    if (error || !data) return <div>something went wrong</div>

    const { companies } = categories

    const renderLogo = (company) => {
      switch (company) {
        case "planmeca":
          return <PlanmecaLogo className="logo" />
        default:
          return <QuestionMark className="logo undefined-company" />
      }
    }

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

  const renderAddCompanyButton = () => {
    if (!apiKey) return

    return (
      <li className="add-company-button">
        <input
          type="text"
          value={newCompanyName}
          onChange={handleChangeNewCompanyName}
        />
        <input
          className="image-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button onClick={addCategoryMutation.mutate}>add company</button>
      </li>
    )
  }

  return (
    <ul className="companies">
      {renderCompanies()} {renderAddCompanyButton()}
    </ul>
  )
}

export default Companies
