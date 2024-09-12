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
  {
    id: 17,
    name: {
      en: "name of product 17",
      ka: "პროდუქტი 17-ის სახელი",
      ru: "название продукта 17",
    },
    fixedPrice: true,
    price: "3000",
    description: {
      en: "This is a product description for product 17. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 17-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 17. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "equipment",
    inStock: false,
    images: [imageList[10]],
  },
  {
    id: 18,
    name: {
      en: "name of product 18",
      ka: "პროდუქტი 18-ის სახელი",
      ru: "название продукта 18",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 18. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 18-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 18. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "consumables",
    inStock: true,
    images: [imageList[11]],
  },
  {
    id: 19,
    name: {
      en: "name of product 19",
      ka: "პროდუქტი 19-ის სახელი",
      ru: "название продукта 19",
    },
    fixedPrice: true,
    price: "1500",
    description: {
      en: "This is a product description for product 19. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 19-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 19. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "accessories",
    inStock: false,
    images: [imageList[12]],
  },
  {
    id: 20,
    name: {
      en: "name of product 20",
      ka: "პროდუქტი 20-ის სახელი",
      ru: "название продукта 20",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 20. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 20-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 20. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "software",
    inStock: true,
    images: [imageList[13]],
  },
  {
    id: 21,
    name: {
      en: "name of product 21",
      ka: "პროდუქტი 21-ის სახელი",
      ru: "название продукта 21",
    },
    fixedPrice: true,
    price: "4000",
    description: {
      en: "This is a product description for product 21. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 21-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 21. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "consumables",
    inStock: true,
    images: [imageList[14]],
  },
  {
    id: 22,
    name: {
      en: "name of product 22",
      ka: "პროდუქტი 22-ის სახელი",
      ru: "название продукта 22",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 22. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 22-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 22. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[15]],
  },
  {
    id: 23,
    name: {
      en: "name of product 23",
      ka: "პროდუქტი 23-ის სახელი",
      ru: "название продукта 23",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 23. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 23-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 23. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "software",
    inStock: false,
    images: [imageList[16]],
  },
  {
    id: 24,
    name: {
      en: "name of product 24",
      ka: "პროდუქტი 24-ის სახელი",
      ru: "название продукта 24",
    },
    fixedPrice: true,
    price: "7000",
    description: {
      en: "This is a product description for product 24. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 24-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 24. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "accessories",
    inStock: true,
    images: [imageList[17]],
  },
  {
    id: 25,
    name: {
      en: "name of product 25",
      ka: "პროდუქტი 25-ის სახელი",
      ru: "название продукта 25",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 25. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 25-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 25. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "consumables",
    inStock: false,
    images: [imageList[18]],
  },
  {
    id: 26,
    name: {
      en: "name of product 26",
      ka: "პროდუქტი 26-ის სახელი",
      ru: "название продукта 26",
    },
    fixedPrice: true,
    price: "3200",
    description: {
      en: "This is a product description for product 26. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 26-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 26. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "equipment",
    inStock: true,
    images: [imageList[19]],
  },
  {
    id: 27,
    name: {
      en: "name of product 27",
      ka: "პროდუქტი 27-ის სახელი",
      ru: "название продукта 27",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 27. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 27-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 27. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "software",
    inStock: true,
    images: [imageList[20]],
  },
  {
    id: 28,
    name: {
      en: "name of product 28",
      ka: "პროდუქტი 28-ის სახელი",
      ru: "название продукта 28",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 28. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 28-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 28. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "accessories",
    inStock: false,
    images: [imageList[21]],
  },
  {
    id: 29,
    name: {
      en: "name of product 29",
      ka: "პროდუქტი 29-ის სახელი",
      ru: "название продукта 29",
    },
    fixedPrice: true,
    price: "2500",
    description: {
      en: "This is a product description for product 29. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 29-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 29. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "consumables",
    inStock: true,
    images: [imageList[22]],
  },
  {
    id: 30,
    name: {
      en: "name of product 30",
      ka: "პროდუქტი 30-ის სახელი",
      ru: "название продукта 30",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 30. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 30-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 30. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "equipment",
    inStock: false,
    images: [imageList[23]],
  },
  {
    id: 31,
    name: {
      en: "name of product 31",
      ka: "პროდუქტი 31-ის სახელი",
      ru: "название продукта 31",
    },
    fixedPrice: true,
    price: "1800",
    description: {
      en: "This is a product description for product 31. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 31-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 31. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "software",
    inStock: true,
    images: [imageList[24]],
  },
  {
    id: 32,
    name: {
      en: "name of product 32",
      ka: "პროდუქტი 32-ის სახელი",
      ru: "название продукта 32",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 32. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 32-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 32. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "accessories",
    inStock: true,
    images: [imageList[25]],
  },
  {
    id: 33,
    name: {
      en: "name of product 33",
      ka: "პროდუქტი 33-ის სახელი",
      ru: "название продукта 33",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 33. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 33-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 33. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "consumables",
    inStock: false,
    images: [imageList[26]],
  },
  {
    id: 34,
    name: {
      en: "name of product 34",
      ka: "პროდუქტი 34-ის სახელი",
      ru: "название продукта 34",
    },
    fixedPrice: true,
    price: "3600",
    description: {
      en: "This is a product description for product 34. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 34-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 34. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[27]],
  },
  {
    id: 35,
    name: {
      en: "name of product 35",
      ka: "პროდუქტი 35-ის სახელი",
      ru: "название продукта 35",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 35. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 35-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 35. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "software",
    inStock: true,
    images: [imageList[28]],
  },
  {
    id: 36,
    name: {
      en: "name of product 36",
      ka: "პროდუქტი 36-ის სახელი",
      ru: "название продукта 36",
    },
    fixedPrice: true,
    price: "2900",
    description: {
      en: "This is a product description for product 36. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 36-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 36. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "accessories",
    inStock: true,
    images: [imageList[29]],
  },
  {
    id: 37,
    name: {
      en: "name of product 37",
      ka: "პროდუქტი 37-ის სახელი",
      ru: "название продукта 37",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 37. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 37-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 37. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "consumables",
    inStock: false,
    images: [imageList[30]],
  },
  {
    id: 38,
    name: {
      en: "name of product 38",
      ka: "პროდუქტი 38-ის სახელი",
      ru: "название продукта 38",
    },
    fixedPrice: true,
    price: "4100",
    description: {
      en: "This is a product description for product 38. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 38-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 38. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "equipment",
    inStock: true,
    images: [imageList[31]],
  },
  {
    id: 39,
    name: {
      en: "name of product 39",
      ka: "პროდუქტი 39-ის სახელი",
      ru: "название продукта 39",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "This is a product description for product 39. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 39-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 39. Оно предоставляет подробную информацию о продукте.",
    },
    company: "planmeca",
    type: "accessories",
    inStock: false,
    images: [imageList[32]],
  },
  {
    id: 40,
    name: {
      en: "name of product 40",
      ka: "პროდუქტი 40-ის სახელი",
      ru: "название продукта 40",
    },
    fixedPrice: true,
    price: "3700",
    description: {
      en: "This is a product description for product 40. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 40-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 40. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "software",
    inStock: true,
    images: [imageList[33]],
  },
  {
    id: 41,
    name: {
      en: "name of product 41",
      ka: "პროდუქტი 41-ის სახელი",
      ru: "название продукта 41",
    },
    fixedPrice: true,
    price: "3700",
    description: {
      en: "This is a product description for product 41. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 41-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 41. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "software",
    inStock: true,
    images: [imageList[33]],
  },
  {
    id: 42,
    name: {
      en: "name of product 42",
      ka: "პროდუქტი 42-ის სახელი",
      ru: "название продукта 42",
    },
    fixedPrice: true,
    price: "3700",
    description: {
      en: "This is a product description for product 42. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 42-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 42. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "software",
    inStock: true,
    images: [imageList[33]],
  },
  {
    id: 43,
    name: {
      en: "name of product 43",
      ka: "პროდუქტი 43-ის სახელი",
      ru: "название продукта 43",
    },
    fixedPrice: true,
    price: "3700",
    description: {
      en: "This is a product description for product 43. It provides detailed information about the product.",
      ka: "ეს არის პროდუქტის აღწერა პროდუქტის 43-ისთვის. ეს აღწერს პროდუქტის დეტალურ ინფორმაციას.",
      ru: "Это описание продукта для продукта 43. Оно предоставляет подробную информацию о продукте.",
    },
    company: "",
    type: "software",
    inStock: true,
    images: [imageList[33]],
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

export const getProducts = async (filter, language = "en", limit = 20, page = 1) => {
  await simulateDelay(200)

  let filteredProducts

  if (filter) filteredProducts = filterProducts(productList, filter, language)
  else filteredProducts = productList

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const hasNextPage = endIndex < filteredProducts.length

  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      hasNextPage: hasNextPage,
      totalProducts: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
    },
  }
}

export const getProduct = (id, language = "en") => {
  const product = productList.filter((product) => product.id === Number(id))[0]

  const { name, description } = product

  return { ...product, name: name[language], description: description[language] }
}

// gets product for edit page, it has all languages (so it will be possible to edit all of them)
export const getEditProduct = (id) => {
  const product = productList.filter((product) => product.id === Number(id))[0]

  return product
}
