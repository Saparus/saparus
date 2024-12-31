import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useOutletContext } from "react-router-dom"
import { toast } from "react-toastify"

import {
  getEditSingleChildrenProgramArticle,
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
  } = useQuery(["dashboard-news", id, apiKey], () =>
    getEditSingleChildrenProgramArticle(id, apiKey)
  )

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
      const errorMessage = error.response.data.message || error.message || "Something went wrong"

      console.log(errorMessage)
      toast.error(errorMessage)
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
