import { useMutation, useQueryClient } from "react-query"
import { useOutletContext } from "react-router-dom"
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

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: async (product) => {
      const { title, text, images, id } = product

      return await addChildrenProgramArticle(title, text, images, id, apiKey)
    },
    onSuccess: () => {
      toast.success("Changes saved successfully")
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
      type="children program"
    />
  )
}

export default AddChildrenProgramArticle
