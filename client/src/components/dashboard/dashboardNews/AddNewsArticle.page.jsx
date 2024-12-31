import { useMutation, useQueryClient } from "react-query"
import { useOutletContext } from "react-router-dom"
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

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: async (product) => {
      const { title, text, images, id } = product

      return await addNewsArticle(title, text, images, id, apiKey)
    },
    onSuccess: () => {
      toast.success(t("Changes saved successfully"))
      queryClient.invalidateQueries(["news", apiKey]) // this will cause refetching
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
