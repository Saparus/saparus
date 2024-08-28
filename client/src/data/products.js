import filterProducts from "../utils/filter"

const images = require.context("../assets/product_images", true)
const imageList = images.keys().map((image) => images(image))

export const products_template = [
  {
    id: 1,
    name: "Planmeca Compact™ i Classic",
    price: "on request",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione architecto, incidunt, unde, culpa consequuntur dicta labore voluptatem eligendi praesentium sit consequatur perferendis eaque beatae cupiditate quos quam soluta facere magnam.",
    company: "",
    type: "accessories",
    inStock: true,
    images: [imageList[0], imageList[1], imageList[0], imageList[1], imageList[0], imageList[1]],
  },
  {
    id: 2,
    name: "name of the product 2",
    price: "2000$",
    description: "",
    company: "planmeca",
    type: "equipment",
    inStock: true,
    images: [imageList[1]],
  },
  {
    id: 3,
    name: "name of the product 3",
    price: "on request",
    description: "",
    company: "planmeca",
    type: "software",
    inStock: false,
    images: [imageList[2]],
  },
  {
    id: 4,
    name: "name of the product 4",
    price: "on request",
    description: "",
    company: "",
    type: "accessories",
    inStock: true,
    images: [imageList[3]],
  },
  {
    id: 5,
    name: "name of the product 5",
    price: "on request",
    description: "",
    company: "",
    type: "consumables",
    inStock: true,
    images: [imageList[4]],
  },
  {
    id: 6,
    name: "name of the product 6",
    price: "500$",
    description: "",
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[5]],
  },
  {
    id: 7,
    name: "name of the product 7",
    price: "on request",
    description: "",
    company: "planmeca",
    type: "software",
    inStock: true,
    images: [imageList[6]],
  },
  {
    id: 8,
    name: "name of the product 8",
    price: "on request",
    description: "",
    company: "",
    type: "",
    inStock: true,
    images: [imageList[7]],
  },
  {
    id: 9,
    name: "name of the product 9",
    price: "on request",
    description: "",
    company: "planmeca",
    type: "consumables",
    inStock: true,
    images: [imageList[8]],
  },
  {
    id: 10,
    name: "name of the product 10",
    price: "on request",
    description: "",
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[9]],
  },
  {
    id: 11,
    name: "name of the product 11",
    price: "on request",
    description: "",
    company: "planmeca",
    type: "software",
    inStock: true,
    images: [imageList[6]],
  },
  {
    id: 12,
    name: "name of the product 12",
    price: "on request",
    description: "",
    company: "",
    type: "",
    inStock: true,
    images: [imageList[7]],
  },
  {
    id: 13,
    name: "name of the product 13",
    price: "on request",
    description: "",
    company: "planmeca",
    type: "consumables",
    inStock: true,
    images: [imageList[8]],
  },
  {
    id: 14,
    name: "name of the product 14",
    price: "on request",
    description: "",
    company: "",
    type: "equipment",
    inStock: true,
    images: [imageList[9]],
  },
]

export const categories = (category) => {
  try {
    const options = [...new Set(products_template.map((product) => product[category]))]
    return options.filter((option) => option !== "")
  } catch {
    console.error("Error fetching categories")
    return []
  }
}

const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getProducts = async (filter) => {
  await simulateDelay(200)

  if (filter) return filterProducts(products_template, filter)

  return products_template
}
