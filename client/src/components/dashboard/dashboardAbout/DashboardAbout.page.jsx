import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import { useOutletContext } from "react-router-dom"

import { Contacts } from "../../other/Footer"

import { getEditAboutItems } from "../../../data/about"

import Loading from "../../other/Loading"
import EditAboutItem from "./EditAboutItem"

import Map from "../../other/Map"

const languages = [
  { code: "en", name: "English" },
  { code: "ka", name: "Georgian" },
  { code: "ru", name: "Russian" },
]

const DashboardAboutPage = () => {
  const { token } = useOutletContext()

  const { t } = useTranslation("translation", { keyPrefix: "about us" })
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage.split("-")[0])
  const [wasSomethingChanged, setWasSomethingChanged] = useState(false)
  // const [newAboutItems, setNewAboutItems] = useState([])

  const [aboutItemList, setAboutItemList] = useState()

  const { data, isLoading, error } = useQuery({
    queryFn: () => getEditAboutItems(token),
    queryKey: ["about", token],
  })

  // const aboutItemList = [...data, ...newAboutItems]

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

  const handleAddNewAboutItems = (id, position, title, text, image) => {
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

      const stateToUpdate = structuredClone(prevState)

      // console.log(
      //   `Editing item at index ${indexToUpdate}, id: ${id} position: ${position} title: ${title} image: ${image}`
      // )

      stateToUpdate[indexToUpdate] = {
        ...stateToUpdate[indexToUpdate],
        id,
        position: position !== undefined ? position : prevState[indexToUpdate]?.position,
        title: title !== undefined ? title : prevState[indexToUpdate]?.title,
        text: text !== undefined ? text : prevState[indexToUpdate]?.text,
        image: image !== undefined ? image : prevState[indexToUpdate]?.image,
      }

      return stateToUpdate
    })
  }

  const swapPlaces = (id1, id2) => {
    // console.log({ id1, id2 })

    const [item1, item2] = aboutItemList.reduce(
      (acc, item, index) => {
        if (item.id === id1) acc[0] = item
        if (item.id === id2) acc[1] = item
        return acc
      },
      [null, null]
    )

    if (!item1 || !item2) {
      return
    }

    handleEditAboutItem(item1.id, item2.position)
    handleEditAboutItem(item2.id, item1.position)
  }

  const handleAboutItemMoveUp = (id) => {
    const itemToUpdate = aboutItemList.find((item) => item.id === id)

    if (itemToUpdate.position > 0) {
      const itemToSwap = aboutItemList.find((item) => item.position === itemToUpdate.position - 1)

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

  const handleSave = () => {
    //
    handleUnchange()
  }

  const handleDiscard = () => {
    setAboutItemList(data)
    handleUnchange()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const renderLanguageSelect = () => {
    return (
      <div className="language-select">
        {languages.map((language) => (
          <button
            key={language.code}
            className={`${selectedLanguage === language.code ? "language-selected" : ""}`}
            onClick={() => {
              setSelectedLanguage(language.code)
            }}
          >
            {language.name}
          </button>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    if (isLoading) return <Loading />

    if (!data || !aboutItemList || error) return <div>something went wrong</div>

    return [...aboutItemList]
      .sort((a, b) => a.position - b.position)
      .map((aboutItem) => {
        return (
          <EditAboutItem
            key={aboutItem.id}
            currentLanguage={currentLanguage}
            aboutItem={aboutItem}
            handleChange={handleChange}
            handleUnchange={handleUnchange}
            selectedLanguage={selectedLanguage}
            handleAboutItemMoveUp={() => {
              handleAboutItemMoveUp(aboutItem.id)
            }}
            handleAboutItemMoveDown={() => {
              handleAboutItemMoveDown(aboutItem.id)
            }}
            handleDeleteAboutItem={() => {
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
          {renderLanguageSelect()}
          <Map />
          <Contacts />
        </div>
      </div>
      {renderContent()}
      {wasSomethingChanged ? renderConfirmChange() : ""}
    </div>
  )
}

export default DashboardAboutPage
