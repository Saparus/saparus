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
  const { token } = useOutletContext()

  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage.split("-")[0])
  const [wasSomethingChanged, setWasSomethingChanged] = useState(false)

  const [aboutItemList, setAboutItemList] = useState([])

  const { data, isLoading, error } = useQuery(["about", token], () => getAllEditAboutItems(token), {
    enabled: !!token,
  })

  const queryClient = useQueryClient()

  const editAboutItemsMutation = useMutation({
    mutationFn: async () => await editAllAboutItems(aboutItemList, token),
    onSuccess: () => {
      toast.success("Changes saved successfully")
      queryClient.invalidateQueries(["about", token]) // it will cause refetching
    },
    onError: (error) => {
      console.log(error)
      toast.error(
        "Something went wrong while saving About page, check browser console for more detailed explanation"
      )
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

    let temp = { ...itemList[index1] }

    itemList[index1].position = itemList[index2].position
    itemList[index2].position = temp.position

    temp = itemList[index1]

    itemList[index1] = structuredClone(itemList[index2])
    itemList[index2] = structuredClone(temp)

    itemList.sort((a, b) => a.position - b.position)

    setAboutItemList(itemList)
  }

  const handleAboutItemMoveUp = (id) => {
    const itemToUpdate = aboutItemList.find((item) => item.id === id)

    if (itemToUpdate.position > 0) {
      const itemToSwap = aboutItemList.find((item) => item.position === itemToUpdate.position - 1)

      if (!itemToSwap) return

      swapPlaces(id, itemToSwap.id)
    }
  }

  const handleAboutItemMoveDown = (id) => {
    const itemToUpdate = aboutItemList.find((item) => item.id === id)

    if (itemToUpdate.position < aboutItemList.length - 1) {
      const itemToSwap = aboutItemList.find((item) => item.position === itemToUpdate.position + 1)

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

    return aboutItemList.map((aboutItem) => {
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
          confirm
        </button>
        <button
          className="change-discard"
          onClick={handleDiscard}
        >
          discard
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
        add
      </button>
      {wasSomethingChanged ? renderConfirmChange() : ""}
    </div>
  )
}

export default DashboardAboutPage
