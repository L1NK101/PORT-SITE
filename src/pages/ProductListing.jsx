import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import './ProductListing.css'

const ProductListing = () => {
  return (
    <div className="product-listing">
      <div className="listing-container">
        <div className="listing-header">
          <h2>All Products</h2>
          <p className="product-count">{products.length} products</p>
        </div>
        <div className="products-grid">
          {products.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card"
            >
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                {!product.inStock && (
                  <div className="out-of-stock">Out of Stock</div>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductListing



