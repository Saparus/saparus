import { useMutation, useQueryClient } from "react-query"
import { useOutletContext, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { addChildrenProgramArticle } from "../../../services/childrenProgramServices"

import EditNewsPanel from "../dashboardNews/EditNewsPanel"

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

const AddChildrenProgramArticle = () => {
  const { apiKey } = useOutletContext()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: async (product) => {
      const { title, text, images } = product

      return await addChildrenProgramArticle(title, text, images, apiKey)
    },
    onSuccess: (data) => {
      toast.success("Changes saved successfully")
      queryClient.invalidateQueries(["news", apiKey]) // this will cause refetching

      if (data.article.id) navigate(`../../admin/children/${data.article.id}`)
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
      type="children program"
    />
  )
}

export default AddChildrenProgramArticle
