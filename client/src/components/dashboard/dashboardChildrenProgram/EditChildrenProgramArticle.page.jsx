import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useOutletContext } from "react-router-dom"
import { toast } from "react-toastify"

// import { getEditProduct } from "../../../data/products"
// import { editProduct, getEditProduct } from "../../../services/productServices"
// import { getEditSingleNewsArticle, editNewsArticle } from "../../../services/newsServices"
import {
  getEditChildrenProgramArticles,
  editChildrenProgramArticle,
} from "../../../services/childrenProgramServices"

import EditNewsPanel from "../dashboardNews/EditNewsPanel"
import Loading from "../../other/Loading"

const EditChildrenProgramArticle = () => {
  const { apiKey } = useOutletContext()

  const { id } = useParams()

  const {
    data: article,
    isLoading,
    error,
  } = useQuery(["dashboard-news", id, apiKey], () => getEditChildrenProgramArticles(id, apiKey))

  const queryClient = useQueryClient()

  const editNewsArticleMutation = useMutation({
    mutationFn: async (product) => {
      const { title, text, images } = product

      return await editChildrenProgramArticle(id, title, text, images, apiKey)
    },
    onSuccess: () => {
      toast.success("Changes saved successfully")
      queryClient.invalidateQueries(["children-program", apiKey]) // this will cause refetching
    },
    onError: (error) => {
      console.log(error.message)
      toast.error(
        "Something went wrong while adding product, check browser console for more detailed explanation"
      )
    },
  })

  if (isLoading) return <Loading />
  if (error || !article) return <div>Something went wrong</div>

  return (
    <EditNewsPanel
      article={article}
      onSave={editNewsArticleMutation.mutate}
      apiKey={apiKey}
      type="children program"
    />
  )
}

export default EditChildrenProgramArticle
