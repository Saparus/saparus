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
    onMutate: () => {
      toast.loading("Adding children program...")
    },
    onSuccess: (data) => {
      toast.dismiss()
      toast.success("Successfully added children program")

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("children"),
      })

      // if (data.article.id) navigate(`../../admin/children/${data.article.id}`)
      if (data.article.id) navigate(`../../admin/children`)
    },
    onError: (error) => {
      const errorMessage = error.response.data.message || error.message || "Something went wrong"

      toast.dismiss()
      toast.error(errorMessage)
      console.log(errorMessage)
    },
  })

  const { isLoading } = addProductMutation

  return (
    <EditNewsPanel
      article={emptyNewsArticle}
      onSave={addProductMutation.mutate}
      apiKey={apiKey}
      isLoading={isLoading}
      type="children program"
    />
  )
}

export default AddChildrenProgramArticle
