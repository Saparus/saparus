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
    onMutate: () => {
      toast.loading("Adding news article...")
    },
    onSuccess: (data) => {
      toast.dismiss()
      toast.success("Successfully added news article")

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("news"),
      })

      // if (data.article.id) navigate(`../../admin/news/${data.article.id}`)
      navigate(`../../admin/news`)
    },
    onError: (error) => {
      const errorMessage = error.response.data.message || error.message || "Something went wrong"

      toast.dismiss()
      toast.error(errorMessage)
      console.log(errorMessage)
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
