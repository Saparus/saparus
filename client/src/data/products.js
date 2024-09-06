// import filterProducts from "../utils/filter"
import filterProducts from "../utils/filterProducts"

const images = require.context("../assets/product_images", true)
const imageList = images.keys().map((image) => images(image))

export const productList = [
  {
    id: 1,
    name: {
      en: "Planmeca Compact™ i Classic",
      ka: "პლანმეკა კომპაქტ™ i Classic",
      ru: "Планмека Компакт™ i Classic",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 1. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 1-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 1. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "accessories",
    inStock: true,
    images: [imageList[0], imageList[1], imageList[0], imageList[1], imageList[0], imageList[1]],
  },
  {
    id: 2,
    name: {
      en: "name of product 2",
      ka: "პროდუქტი 2-ის სახელი",
      ru: "название продукта 2",
    },
    fixedPrice: true,
    price: "2000",
    description: {
      en: "This is a product description for product 2. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 2-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 2. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "equipment",
    inStock: true,
    images: [imageList[1]],
  },
  {
    id: 3,
    name: {
      en: "name of product 3",
      ka: "პროდუქტი 3-ის სახელი",
      ru: "название продукта 3",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 3. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 3-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 3. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "software",
    inStock: false,
    images: [imageList[2]],
  },
  {
    id: 4,
    name: {
      en: "name of product 4",
      ka: "პროდუქტი 4-ის სახელი",
      ru: "название продукта 4",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 4. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 4-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 4. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "accessories",
    inStock: true,
    images: [imageList[3]],
  },
  {
    id: 5,
    name: {
      en: "name of product 5",
      ka: "პროდუქტი 5-ის სახელი",
      ru: "название продукта 5",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 5. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 5-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 5. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "consumables",
    inStock: true,
    images: [imageList[4]],
  },
  {
    id: 6,
    name: {
      en: "name of product 6",
      ka: "პროდუქტი 6-ის სახელი",
      ru: "название продукта 6",
    },
    fixedPrice: false,
    price: "500",
    description: {
      en: "This is a product description for product 6. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 6-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 6. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[5]],
  },
  {
    id: 7,
    name: {
      en: "name of product 7",
      ka: "პროდუქტი 7-ის სახელი",
      ru: "название продукта 7",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 7. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 7-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 7. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "software",
    inStock: true,
    images: [imageList[6]],
  },
  {
    id: 8,
    name: {
      en: "name of product 8",
      ka: "პროდუქტი 8-ის სახელი",
      ru: "название продукта 8",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 8. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 8-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 8. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "",
    inStock: true,
    images: [imageList[7]],
  },
  {
    id: 9,
    name: {
      en: "name of product 9",
      ka: "პროდუქტი 9-ის სახელი",
      ru: "название продукта 9",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 9. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 9-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 9. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "consumables",
    inStock: true,
    images: [imageList[8]],
  },
  {
    id: 10,
    name: {
      en: "name of product 10",
      ka: "პროდუქტი 10-ის სახელი",
      ru: "название продукта 10",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 10. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 10-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 10. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[9]],
  },
  {
    id: 11,
    name: {
      en: "name of product 11",
      ka: "პროდუქტი 11-ის სახელი",
      ru: "название продукта 11",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 11. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 11-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 11. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "software",
    inStock: true,
    images: [imageList[6]],
  },
  {
    id: 12,
    name: {
      en: "name of product 12",
      ka: "პროდუქტი 12-ის სახელი",
      ru: "название продукта 12",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 12. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 12-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 12. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "",
    inStock: true,
    images: [imageList[7]],
  },
  {
    id: 13,
    name: {
      en: "name of product 13",
      ka: "პროდუქტი 13-ის სახელი",
      ru: "название продукта 13",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 13. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 13-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 13. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "consumables",
    inStock: true,
    images: [imageList[8]],
  },
  {
    id: 14,
    name: {
      en: "name of product 14",
      ka: "პროდუქტი 14-ის სახელი",
      ru: "название продукта 14",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 14. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 14-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 14. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[9]],
  },
  {
    id: 15,
    name: {
      en: "name of product 15",
      ka: "პროდუქტი 15-ის სახელი",
      ru: "название продукта 15",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 15. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 15-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 15. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[9]],
  },
  {
    id: 16,
    name: {
      en: "name of product 16",
      ka: "პროდუქტი 16-ის სახელი",
      ru: "название продукта 16",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 16. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 16-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 16. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[9]],
  },
]

export const categories = (category) => {
  try {
    const options = [...new Set(productList.map((product) => product[category]))]
    return options.filter((option) => option !== "")
  } catch {
    console.error("Error fetching categories")
    return []
  }
}

const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getProducts = async (filter, language = "en") => {
  await simulateDelay(200)

  let filteredProducts

  if (filter) filteredProducts = filterProducts(productList, filter, language)
  else filteredProducts = productList

  return filteredProducts
}

export const getProduct = (id, language = "en") => {
  const product = productList.filter((product) => product.id === Number(id))[0]

  const { name, description } = product

  return { ...product, name: name[language], description: description[language] }
}
