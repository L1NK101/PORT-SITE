'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import './Header.css'

const Header = () => {
  const { getTotalItems } = useCart()

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          Zone Store
        </Link>
        <nav className="nav">
          <Link href="/" className="nav-link">Shop</Link>
          <Link href="/products" className="nav-link">Products</Link>
          <Link href="/checkout" className="nav-link cart-link">
            Cart
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header


