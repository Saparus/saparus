const fs = require("fs")
const path = require("path")

const imagesDirectory = path.join(__dirname, "./images/product_images")
const imageFiles = fs.readdirSync(imagesDirectory)
const imageList = imageFiles.map((file) => {
  const filePath = path.join(imagesDirectory, file)
  const imageData = fs.readFileSync(filePath).toString("base64")
  return `data:image/jpeg;base64,${imageData}`
})

const productList = [
  {
    id: 1,
    name: {
      en: "name of product1",
      ka: "პროდუქტი 1-ის სახელი",
      ru: "название продукта 1",
    },
    fixedPrice: true,
    price: 2000,
    description: {
      en: "This is a product description for product 1. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 1-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 1. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "dental units" },
    inStock: true,
    images: [imageList[0]],
  },
  {
    id: 2,
    name: {
      en: "name of product2",
      ka: "პროდუქტი 2-ის სახელი",
      ru: "название продукта 2",
    },
    fixedPrice: true,
    price: 5000,
    description: {
      en: "This is a product description for product 2. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 2-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 2. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "dental units" },
    inStock: true,
    images: [imageList[1]],
  },
  {
    id: 3,
    name: {
      en: "name of product3",
      ka: "პროდუქტი 3-ის სახელი",
      ru: "название продукта 3",
    },
    fixedPrice: false,
    price: 0,
    description: {
      en: "This is a product description for product 3. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 3-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 3. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "dental units" },
    inStock: true,
    images: [imageList[2]],
  },
  {
    id: 4,
    name: {
      en: "name of product4",
      ka: "პროდუქტი 4-ის სახელი",
      ru: "название продукта 4",
    },
    fixedPrice: true,
    price: 60,
    description: {
      en: "This is a product description for product 4. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 4-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 4. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "equipment" },
    inStock: false,
    images: [imageList[3]],
  },
  {
    id: 5,
    name: {
      en: "name of product5",
      ka: "პროდუქტი 5-ის სახელი",
      ru: "название продукта 5",
    },
    fixedPrice: true,
    price: 40,
    description: {
      en: "This is a product description for product 5. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 5-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 5. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "consumables" },
    inStock: true,
    images: [imageList[4]],
  },
  {
    id: 6,
    name: {
      en: "name of product6",
      ka: "პროდუქტი 6-ის სახელი",
      ru: "название продукта 6",
    },
    fixedPrice: true,
    price: 4000,
    description: {
      en: "This is a product description for product 6. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 6-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 6. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "dental units" },
    inStock: false,
    images: [imageList[5]],
  },
  {
    id: 7,
    name: {
      en: "name of product7",
      ka: "პროდუქტი 7-ის სახელი",
      ru: "название продукта 7",
    },
    fixedPrice: true,
    price: 4500,
    description: {
      en: "This is a product description for product 7. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 7-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 7. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "dental units" },
    inStock: true,
    images: [imageList[6]],
  },
  {
    id: 8,
    name: {
      en: "name of product8",
      ka: "პროდუქტი 8-ის სახელი",
      ru: "название продукта 8",
    },
    fixedPrice: true,
    price: 60,
    description: {
      en: "This is a product description for product 8. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 8-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 8. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "equipment" },
    inStock: true,
    images: [imageList[7]],
  },
  {
    id: 9,
    name: {
      en: "name of product9",
      ka: "პროდუქტი 9-ის სახელი",
      ru: "название продукта 9",
    },
    fixedPrice: true,
    price: 3500,
    description: {
      en: "This is a product description for product 9. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 9-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 9. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "dental units" },
    inStock: true,
    images: [imageList[8]],
  },
  {
    id: 10,
    name: {
      en: "name of product10",
      ka: "პროდუქტი 10-ის სახელი",
      ru: "название продукта 10",
    },
    fixedPrice: true,
    price: 2000,
    description: {
      en: "This is a product description for product 10. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 10-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 10. Оно предоставляет подробную информацию о продукте.",
    },
    categories: { company: "planmeca", type: "dental units" },
    inStock: true,
    images: [imageList[9]],
  },
]

module.exports = productList
