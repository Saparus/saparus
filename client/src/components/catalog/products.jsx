import { ReactComponent as Phone } from '../../assets/phone.svg';
import { Link } from 'react-router-dom';
import {products_template} from '../products'
import filterProducts from './filter';

const Products = ({ filtered }) => {
    const filteredProducts = filterProducts(products_template, filtered)
    return (
        <div className='products'>
            {filteredProducts.length ?
                filteredProducts.map((product, index) => (
                    <div key={index} className='product'>
                        <div className="image">
                            <img src={product.image} alt="" />
                        </div>
                        <div className='information'>
                            <h3 className='name'>{product.name}</h3>
                            <h3 className='instock' style={{ color: product.inStock ? "green" : "red" }}>{product.inStock ? "• in stock" : "• out of stock"}</h3>
                            <hr />
                            <div className='shop'>
                                <p className='price'>{product.price}</p>
                                <Link to="/about"><Phone className="cart" /></Link>
                            </div>
                        </div>
                    </div>
                ))
                : <h3>products not found</h3>
            }
        </div>

    );
};


export default Products;