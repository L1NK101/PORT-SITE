'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'
import Navbar from '../../components/Navbar'
import './ProductDetail.css'

const DETAIL_COPY = {
  notFound: 'Product not found',
  backToShop: 'Back to shop',
  addToCart: 'Add to Cart',
  addedToCart: 'Added to Cart',
  buyNow: 'Buy Now',
}

const ProductDetail = () => {
  const params = useParams()
  const router = useRouter()
  const productId = typeof params?.id === 'string' ? params.id : params?.id?.[0] || ''
  const product = getProductById(productId)
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!addedToCart) {
      return undefined
    }
    const timer = setTimeout(() => setAddedToCart(false), 1600)
    return () => clearTimeout(timer)
  }, [addedToCart])

  if (!product) {
    return (
      <div className="product-detail">
        <Navbar />
        <div className="detail-container">
          <p>{DETAIL_COPY.notFound}</p>
          <Link href="/">{DETAIL_COPY.backToShop}</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
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
        {isLoading ? (
          <div className="product-detail-content" aria-live="polite" aria-busy="true">
            <div className="product-detail-image skeleton shimmer" />
            <div className="product-detail-info">
              <div className="skeleton skeleton-detail-category shimmer" />
              <div className="skeleton skeleton-detail-title shimmer" />
              <div className="skeleton skeleton-detail-price shimmer" />
              <div className="skeleton skeleton-detail-description shimmer" />
              <div className="skeleton skeleton-detail-description shimmer" />
              <div className="skeleton skeleton-detail-badge shimmer" />
              <div className="skeleton skeleton-detail-actions shimmer" />
            </div>
          </div>
        ) : (
          <div className="product-detail-content">
            <div className="product-detail-image">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 968px) 100vw, 50vw"
                loading="lazy"
              />
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
                    className={`add-to-cart-button ${addedToCart ? 'is-success' : ''}`}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    aria-live="polite"
                  >
                    {addedToCart ? (
                      <span className="button-success-content">
                        <span aria-hidden="true">✓</span> {DETAIL_COPY.addedToCart}
                      </span>
                    ) : (
                      DETAIL_COPY.addToCart
                    )}
                  </button>
                  <button
                    className="buy-now-button"
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                  >
                    {DETAIL_COPY.buyNow}
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
        )}
      </div>
    </div>
  )
}

export default ProductDetail


