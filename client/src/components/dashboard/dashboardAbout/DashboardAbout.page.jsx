import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useOutletContext } from "react-router-dom"
import { toast } from "react-toastify"

import { Contacts } from "../../other/Footer"

import { getAllEditAboutItems, editAllAboutItems } from "../../../services/aboutServices"

import Loading from "../../other/Loading"
import EditAboutItem from "./EditAboutItem"
import LanguageSelect from "../LanguageSelect"

import Map from "../../other/Map"

const DashboardAboutPage = () => {
  const { apiKey } = useOutletContext()

  const { i18n } = useTranslation()

  const currentLanguage = i18n.language.split("-")[0]

  const { t } = useTranslation("translation", { keyPrefix: "products" })

  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage.split("-")[0])
  const [wasSomethingChanged, setWasSomethingChanged] = useState(false)

  const [aboutItemList, setAboutItemList] = useState([])

  const { data, isLoading, error } = useQuery(
    ["about", apiKey],
    () => getAllEditAboutItems(apiKey),
    {
      enabled: !!apiKey,
    }
  )

  const queryClient = useQueryClient()

  const editAboutItemsMutation = useMutation({
    mutationFn: async () => await editAllAboutItems(aboutItemList, apiKey),
    onSuccess: () => {
      toast.success("Changes saved successfully")
      queryClient.invalidateQueries(["about", apiKey]) // it will cause refetching
    },
    onError: (error) => {
      const errorMessage = error.response.data.message || error.message || "Something went wrong"

      queryClient.invalidateQueries(["about", apiKey])

      console.log(errorMessage)
      toast.error(errorMessage)
    },
  })

  useEffect(() => {
    if (isLoading || error) return

    setAboutItemList(structuredClone(data))
  }, [data, isLoading, error])

  const handleChange = () => {
    setWasSomethingChanged(true)
  }

  const handleUnchange = () => {
    setWasSomethingChanged(false)
  }

  const addNewAboutItems = (id, position, title, text, image) => {
    setWasSomethingChanged(true)
    setAboutItemList((prevState) => [
      ...prevState,
      {
        id,
        title,
        text,
        image,
        position,
      },
    ])
  }

  const handleDeleteAboutItem = (id) => {
    setAboutItemList((prevState) => prevState.filter((item) => item.id !== id))
  }

  const handleEditAboutItem = (id, position, title, text, image) => {
    setWasSomethingChanged(true)
    setAboutItemList((prevState) => {
      const indexToUpdate = prevState.findIndex((item) => item.id === id)

      const stateToUpdate = prevState

      stateToUpdate[indexToUpdate] = {
        id,
        position: position || prevState[indexToUpdate]?.position,
        title: title || prevState[indexToUpdate]?.title,
        text: text || prevState[indexToUpdate]?.text,
        image: image || prevState[indexToUpdate]?.image,
      }

      return stateToUpdate
    })
  }

  const swapPlaces = (id1, id2) => {
    const itemList = structuredClone(aboutItemList)

    const index1 = itemList.findIndex((item) => item.id === id1)
    const index2 = itemList.findIndex((item) => item.id === id2)

    if (index1 === -1 || index2 === -1) {
      console.error("One or both items not found in the list.")
      return
    }

    // Swap positions
    const tempPosition = itemList[index1].position
    itemList[index1].position = itemList[index2].position
    itemList[index2].position = tempPosition

    // Swap the items
    const tempItem = itemList[index1]
    itemList[index1] = itemList[index2]
    itemList[index2] = tempItem

    setAboutItemList(itemList)
  }

  const handleAboutItemMoveUp = (id) => {
    const itemToUpdate = aboutItemList.find((item) => item.id === id)

    if (itemToUpdate.position >= 0) {
      const itemToSwap = aboutItemList.find((item) => item.position === itemToUpdate.position - 1)

      if (!itemToSwap) return

      swapPlaces(id, itemToSwap.id)
    }
  }

  const handleAboutItemMoveDown = (id) => {
    const itemToUpdate = aboutItemList.find((item) => item.id === id)

    if (itemToUpdate.position <= aboutItemList.length) {
      const itemToSwap = aboutItemList.find((item) => item.position === itemToUpdate.position + 1)

      if (!itemToSwap) return

      swapPlaces(id, itemToSwap.id)
    }
  }

  const handleAddNewAboutItem = () => {
    addNewAboutItems(
      (aboutItemList?.length || 0) + 1,
      (aboutItemList?.[aboutItemList.length - 1]?.position || 0) + 1,
      { en: "", ka: "", ru: "" },
      { en: "", ka: "", ru: "" },
      null
    )
  }

  const handleSave = async () => {
    editAboutItemsMutation.mutate()

    handleUnchange()
  }

  const handleDiscard = () => {
    setAboutItemList(structuredClone(data))
    handleUnchange()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setSelectedLanguage(currentLanguage.split("-")[0])
  }, [currentLanguage])

  const renderContent = () => {
    if (isLoading) return <Loading />

    if (!data || !aboutItemList || error) return <div>something went wrong</div>

    const sortedAboutItemList = [...aboutItemList].sort((a, b) => a.position - b.position)

    return sortedAboutItemList.map((aboutItem) => {
      return (
        <EditAboutItem
          key={aboutItem.id}
          currentLanguage={currentLanguage}
          aboutItem={aboutItem}
          handleChange={handleChange}
          handleUnchange={handleUnchange}
          handleEditAboutItem={handleEditAboutItem}
          selectedLanguage={selectedLanguage}
          handleAboutItemMoveUp={() => {
            handleChange()
            handleAboutItemMoveUp(aboutItem.id)
          }}
          handleAboutItemMoveDown={() => {
            handleChange()
            handleAboutItemMoveDown(aboutItem.id)
          }}
          handleDeleteAboutItem={() => {
            handleChange()
            handleDeleteAboutItem(aboutItem.id)
          }}
          aboutItemList={aboutItemList}
        />
      )
    })
  }

  const renderConfirmChange = () => {
    return (
      <div className="confirm-change">
        <button
          className="change-confirm"
          onClick={handleSave}
        >
          {t("confirm")}
        </button>
        <button
          className="change-discard"
          onClick={handleDiscard}
        >
          {t("discard")}
        </button>
      </div>
    )
  }

  return (
    <div className="about_us page">
      <div className="parts first">
        <div className="centered">
          <LanguageSelect
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <Map />
          <Contacts />
        </div>
      </div>
      {renderContent()}

      <button
        className="add-about-item"
        onClick={handleAddNewAboutItem}
      >
        {t("add new item")}
      </button>
      {wasSomethingChanged ? renderConfirmChange() : ""}
    </div>
  )
}

export default DashboardAboutPage
