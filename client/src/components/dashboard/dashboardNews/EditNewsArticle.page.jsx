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
  const { token } = useOutletContext()

  const { id } = useParams()

  const { t } = useTranslation("translation", { keyPrefix: "news" })

  const {
    data: article,
    isLoading,
    error,
  } = useQuery(["dashboard-news", id, token], () => getEditSingleNewsArticle(id, token))

  const queryClient = useQueryClient()

  const editNewsArticleMutation = useMutation({
    mutationFn: async (product) => {
      const { title, text, images } = product

      return await editNewsArticle(id, title, text, images, token)
    },
    onSuccess: () => {
      toast.success("Changes saved successfully")
      queryClient.invalidateQueries(["news", token]) // this will cause refetching
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
      token={token}
    />
  )
}

export default EditNewsArticlePage
