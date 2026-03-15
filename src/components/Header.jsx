import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

const Header = () => {
  const { getTotalItems } = useCart()

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Zone Store
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Shop</Link>
          <Link to="/cart" className="nav-link cart-link">
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


