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
  const { token } = useOutletContext()

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: async (product) => {
      const { title, text, images, id } = product

      return await addChildrenProgramArticle(title, text, images, id, token)
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

  return (
    <EditNewsPanel
      article={emptyNewsArticle}
      onSave={addProductMutation.mutation}
      token={token}
      type="children program"
    />
  )
}

export default AddChildrenProgramArticle
