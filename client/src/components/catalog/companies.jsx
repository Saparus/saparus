import { useQuery, useMutation, useQueryClient } from "react-query"
import { useState } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

import { ReactComponent as PlanmecaLogo } from "../../assets/companies/planmeca.svg"
import { ReactComponent as QuestionMark } from "../../assets/companies/undefined-company.svg"
import { getCompanies, getCategories, editCategories } from "../../services/categoryServices"

const Companies = ({ setFilter, selectedCompany, apiKey }) => {
  const [newCompanyName, setNewCompanyName] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const { data, isLoading, error } = useQuery(["companies"], getCompanies)

  // const currentLanguage = data

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
        setUploadedImage(newImage)
      }
      reader.readAsDataURL(file)
    }
  }

  const addCategoryMutation = useMutation({
    mutationFn: async () => {
      const newCompany = {
        en: {
          company: { company: { name: newCompanyName } },
        },
        ka: {
          company: { კომპანია: { name: newCompanyName } },
        },
        ru: {
          company: { компания: { name: newCompanyName } },
        },
      }

      return await editCategories(newCompany, uploadedImage, apiKey)
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

    const renderLogo = (company) => {
      if (!company.imageURL) return

      return (
        <img
          src={company.imageURL + "/s.webp"}
          alt=""
          className="company-logo"
        />
      )
    }

    return data.map((company, index) => (
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
    ))
  }

  const renderAddCompanyButton = () => {
    if (!apiKey) return

    return (
      <li className="add-company-button">
        <div className="circle">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="uploaded-image"
            />
          ) : (
            "+"
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="company-image-input"
        />
        <input
          type="text"
          value={newCompanyName}
          onChange={handleChangeNewCompanyName}
          placeholder={t("company")}
          className="company-name-input"
        />
        {uploadedImage && newCompanyName ? (
          <button
            onClick={addCategoryMutation.mutate}
            className="save-company-button"
          >
            {t("add company")}
          </button>
        ) : (
          ""
        )}
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
