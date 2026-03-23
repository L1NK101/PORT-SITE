'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'
import Navbar from '../../components/Navbar'
import './ProductDetail.css'

const ProductDetail = () => {
  const params = useParams()
  const router = useRouter()
  const productId = typeof params?.id === 'string' ? params.id : params?.id?.[0] || ''
  const product = getProductById(productId)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="product-detail">
        <Navbar />
        <div className="detail-container">
          <p>Product not found</p>
          <Link href="/">Back to shop</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    router.push('/checkout')
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }

  return (
    <div className="product-detail">
      <Navbar />
      <div className="detail-container">
        <button className="back-button" onClick={() => router.back()}>
          ← Back
        </button>
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <p className="product-detail-category">{product.category}</p>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>
            {product.inStock ? (
              <div className="in-stock-badge">In Stock</div>
            ) : (
              <div className="out-of-stock-badge">Out of Stock</div>
            )}
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
              </div>
              <div className="action-buttons">
                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  className="buy-now-button"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="product-features">
              <div className="feature">
                <strong>Free Shipping</strong>
                <span>On orders over $50</span>
              </div>
              <div className="feature">
                <strong>30-Day Returns</strong>
                <span>Hassle-free returns</span>
              </div>
              <div className="feature">
                <strong>Secure Payment</strong>
                <span>Your data is safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail


