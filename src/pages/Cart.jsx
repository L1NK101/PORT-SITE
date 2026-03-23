'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '../context/CartContext'
import Navbar from '../../components/Navbar'
import './Cart.css'

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart()
  const router = useRouter()

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <Navbar />
        <div className="cart-container">
          <h2>Your Cart</h2>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link href="/" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <Navbar />
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <p className="cart-item-count">{cartItems.length} item(s)</p>
        </div>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <Link href={`/products/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item-info">
                  <Link href={`/products/${item.id}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-button"
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-header">
              <h3>Order Summary</h3>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{getTotalPrice() > 50 ? 'Free' : '$9.99'}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>
                ${(getTotalPrice() + (getTotalPrice() > 50 ? 0 : 9.99)).toFixed(2)}
              </span>
            </div>
            <button
              className="checkout-button"
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout
            </button>
            <button className="clear-cart-button" onClick={clearCart}>
              Clear Cart
            </button>
            <Link href="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart



