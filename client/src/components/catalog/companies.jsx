import { useQuery, useMutation, useQueryClient } from "react-query"
import { useState } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

import { ReactComponent as PlanmecaLogo } from "../../assets/companies/planmeca.svg"
import { ReactComponent as QuestionMark } from "../../assets/companies/undefined-company.svg"
import { getCompanies, getCategories, editCategories } from "../../services/categoryServices"

const Companies = ({ setFilter, selectedCompany, filter, apiKey }) => {
  const [newCompanyName, setNewCompanyName] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)

  const [editCompanyName, setEditCompanyName] = useState("")
  const [editCompanyImage, setEditCompanyImage] = useState("")

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const currentLanguage = useTranslation().i18n.language

  const { data, isLoading, error } = useQuery(["companies"], getCompanies)

  const queryClient = useQueryClient()

  const handleChangeNewCompanyName = (e) => {
    setNewCompanyName(e.target.value)
  }

  const handleDiscardImage = (e) => {
    e.preventDefault()

    setEditCompanyName("")
    setEditCompanyImage("")
  }

  const handleEditImageUpload = (e, company) => {
    e.preventDefault()

    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = "image/*"

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          setEditCompanyName(company.name)
          setEditCompanyImage(reader.result)
        }
        reader.readAsDataURL(file)
      }
    })

    fileInput.click()
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
    mutationFn: async ({ name, image }) => {
      const newCompany = {
        en: {
          company: { company: { name } },
        },
        ka: {
          company: { კომპანია: { name } },
        },
        ru: {
          company: { компания: { name } },
        },
      }

      return await editCategories(newCompany, image, apiKey)
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
      console.error(errorMessage)
    },
  })

  const renderCompanies = () => {
    // if (isLoading) return <Loading />
    if (isLoading) return
    if (error) return <div>something went wrong</div>
    if (!data?.[currentLanguage]) return

    const companies = data[currentLanguage]

    const renderLogo = (company) => {
      // if (!company.imageURL) return

      return (
        <img
          src={
            company.name === editCompanyName
              ? editCompanyImage
              : company.imageURL + "/s.webp" ||
                `https://saparus-images.s3.amazonaws.com/company_images/${company.name}/s.webp`
          }
          alt=""
          className="company-logo"
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
          <>
            {renderLogo(company)}
            {/* {apiKey ? (
              editCompanyName && editCompanyImage ? (
                <div className="save-company-buttons">
                  <button
                    onClick={() => {
                      addCategoryMutation.mutate(editCompanyName, editCompanyImage)
                    }}
                    className="save-company-button"
                  >
                    save
                  </button>
                  <button
                    onClick={handleDiscardImage}
                    className="discard-company-button"
                  >
                    discard
                  </button>
                </div>
              ) : (
                <button
                  className="edit-company-button"
                  onClick={(e) => {
                    handleEditImageUpload(e, company)
                  }}
                >
                  {t("edit")}
                </button>
              )
            ) : (
              ""
            )} */}
          </>
          <span>{company.name}</span>
        </li>
      )
    })
  }

  return <ul className="companies">{renderCompanies()}</ul>
}

export default Companies
