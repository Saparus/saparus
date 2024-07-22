const images = require.context('../assets/product_images', true);
const imageList = images.keys().map(image => images(image));


const products_template = [
    { id: 1, name: 'Planmeca Compact™ i Classic', price: "on request", description: "", company: "", type: "accessories", inStock: true, image: imageList[0] },
    { id: 2, name: 'name of the product 2', price: "on request", description: "", company: "planmeca", type: "equipment", inStock: true, image: imageList[1] },
    { id: 3, name: 'name of the product 3', price: "on request", description: "", company: "planmeca", type: "software", inStock: false, image: imageList[2] },
    { id: 4, name: 'name of the product 4', price: "on request", description: "", company: "", type: "accessories", inStock: true, image: imageList[3] },
    { id: 5, name: 'name of the product 5', price: "on request", description: "", company: "", type: "consumables", inStock: true, image: imageList[4] },
    { id: 6, name: 'name of the product 6', price: "500$", description: "", company: "", type: "equipment", inStock: true, image: imageList[5] },
    { id: 7, name: 'name of the product 7', price: "on request", description: "", company: "planmeca", type: "software", inStock: true, image: imageList[6] },
    { id: 8, name: 'name of the product 8', price: "on request", description: "", company: "", type: "", inStock: true, image: imageList[7] },
    { id: 9, name: 'name of the product 9', price: "on request", description: "", company: "planmeca", type: "consumables", inStock: true, image: imageList[8] },
    { id: 10, name: 'name of the product 10', price: "on request", description: "", company: "", type: "equipment", inStock: true, image: imageList[9] },
    { id: 11, name: 'name of the product 7', price: "on request", description: "", company: "planmeca", type: "software", inStock: true, image: imageList[6] },
    { id: 12, name: 'name of the product 8', price: "on request", description: "", company: "", type: "", inStock: true, image: imageList[7] },
    { id: 13, name: 'name of the product 9', price: "on request", description: "", company: "planmeca", type: "consumables", inStock: true, image: imageList[8] },
    { id: 14, name: 'name of the product 10', price: "on request", description: "", company: "", type: "equipment", inStock: true, image: imageList[9] }
];
const categories = (category) => {
    try {
        const options = [
            ...new Set(
                products_template.map(product => (product[category])
                ))]
        return options.filter(option => option !== "")
    }
    catch {
        console.error("Error fetching categories")
        return []
    }

}

module.exports = { products_template, categories };