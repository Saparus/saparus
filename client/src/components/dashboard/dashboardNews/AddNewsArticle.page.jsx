import { useMutation, useQueryClient } from "react-query"
import { useOutletContext, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

import { addNewsArticle } from "../../../services/newsServices"

import EditNewsPanel from "./EditNewsPanel"

const emptyNewsArticle = {
  id: null,
  title: {
    en: "",
    ka: "",
    ru: "",
  },
  text: {
    en: "",
    ka: "",
    ru: "",
  },
  images: [],
}

const AddNewsArticlePage = () => {
  const { apiKey } = useOutletContext()

  const navigate = useNavigate()

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: async (product) => {
      const { title, text, images } = product

      return await addNewsArticle(title, text, images, apiKey)
    },
    onSuccess: (data) => {
      toast.success(t("Changes saved successfully"))
      queryClient.invalidateQueries(["news", apiKey]) // this will cause refetching

      console.log(data)

      if (data.article.id) navigate(`../../admin/news/${data.article.id}`)
    },
    onError: (error) => {
      const errorMessage = error.response.data.message || error.message || "Something went wrong"

      console.log(errorMessage)
      toast.error(errorMessage)
    },
  })

  return (
    <EditNewsPanel
      article={emptyNewsArticle}
      onSave={addProductMutation.mutate}
      apiKey={apiKey}
    />
  )
}

export default AddNewsArticlePage
