const filterProducts = (products, filter) => {
    try {
        const filters = Object.fromEntries(
            Object.entries(filter).filter(([key, value]) => value !== "")
        );
        console.log(filters)
        const filteredByStartsWith = products.filter(product => {
            return Object.keys(filters).every(key => {
                const productValue = product[key];
                return productValue && productValue.toLowerCase().startsWith(filters[key].toLowerCase());
            });
        });

        if (filteredByStartsWith.length > 0) {
            return filteredByStartsWith;
        }

        return products.filter(product => {
            return Object.keys(filters).every(key => {
                const productValue = product[key];
                return productValue && productValue.toLowerCase().includes(filters[key].toLowerCase());
            });
        });
    } catch (error) {
        console.error("Error filtering products:", error);
        return [];
    }
};

export default filterProducts;
