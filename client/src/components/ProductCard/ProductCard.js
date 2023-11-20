import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

function ProductCard({id, name, description, price, image, category, brand }) {
    return (
        <div className='main-product-card-div'>
            <div className='product-card'>
                <img src={image} alt={name} className='product-card-image' />
                <div className='product-card-info'>
                    <h2 className='product-name'>{name}</h2>
                    <p className='product-description'>{description}</p>
                    <p className='product-price'>Price: {price}</p>⭐⭐⭐⭐⭐
                    <p className='product-category'>Category: {category}</p>
                    <h4 className='product-brand'>Brand: {brand}</h4>
                </div>
                <Link to={`/buy/${id}`} className='btn-buy'>Buy Now</Link>
            </div>
        </div>
    );
}
export default ProductCard