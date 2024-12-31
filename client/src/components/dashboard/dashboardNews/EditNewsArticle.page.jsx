import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useOutletContext } from "react-router-dom"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

// import { getEditProduct } from "../../../data/products"
// import { editProduct, getEditProduct } from "../../../services/productServices"
import { getEditSingleNewsArticle, editNewsArticle } from "../../../services/newsServices"

import EditNewsPanel from "./EditNewsPanel"
import Loading from "../../other/Loading"

const EditNewsArticlePage = () => {
  const { apiKey } = useOutletContext()

  const { id } = useParams()

  const { t } = useTranslation("translation", { keyPrefix: "news" })

  const {
    data: article,
    isLoading,
    error,
  } = useQuery(["dashboard-news", id, apiKey], () => getEditSingleNewsArticle(id, apiKey))

  const queryClient = useQueryClient()

  const editNewsArticleMutation = useMutation({
    mutationFn: async (newsItem) => {
      const { title, text, images } = newsItem

      return await editNewsArticle(id, title, text, images, apiKey)
    },
    onSuccess: () => {
      toast.success("Changes saved successfully")
      queryClient.invalidateQueries(["news", apiKey]) // this will cause refetching
    },
    onError: (error) => {
      console.log(error.message)
      toast.error(
        "Something went wrong while adding product, check browser console for more detailed explanation"
      )
    },
  })

  if (isLoading) return <Loading />
  if (error || !article) return <div>{t("Something went wrong")}</div>

  return (
    <EditNewsPanel
      article={article}
      onSave={editNewsArticleMutation.mutate}
      apiKey={apiKey}
    />
  )
}

export default EditNewsArticlePage
