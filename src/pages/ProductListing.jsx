'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '../data/products'
import Navbar from '../../components/Navbar'
import './ProductListing.css'

const LISTING_COPY = {
  title: 'All Products',
  searchPlaceholder: 'Search premium products...',
  noResultsTitle: 'No products match your search',
  noResultsDescription: 'Try another keyword or browse the full collection.',
  noResultsAction: 'Clear Search',
}

const SKELETON_CARDS = Array.from({ length: 8 }, (_, index) => `skeleton-${index}`)

const ProductListing = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return products
    }
    return products.filter((product) => {
      const searchableText = `${product.name} ${product.category} ${product.description}`.toLowerCase()
      return searchableText.includes(normalizedQuery)
    })
  }, [query])

  return (
    <div className="product-listing">
      <Navbar />
      <div className="listing-container">
        <div className="listing-header">
          <h2>{LISTING_COPY.title}</h2>
          <p className="product-count">{filteredProducts.length} products</p>
          <div className="listing-search">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="listing-search-input"
              placeholder={LISTING_COPY.searchPlaceholder}
              aria-label="Search products"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="products-grid" aria-live="polite" aria-busy="true">
            {SKELETON_CARDS.map((skeletonCard) => (
              <div key={skeletonCard} className="product-card skeleton-card">
                <div className="product-image-container skeleton shimmer" />
                <div className="product-info">
                  <div className="skeleton skeleton-line skeleton-title shimmer" />
                  <div className="skeleton skeleton-line skeleton-subtitle shimmer" />
                  <div className="skeleton skeleton-line skeleton-price shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="search-empty-state">
            <h3>{LISTING_COPY.noResultsTitle}</h3>
            <p>{LISTING_COPY.noResultsDescription}</p>
            <button type="button" className="clear-search-button" onClick={() => setQuery('')}>
              {LISTING_COPY.noResultsAction}
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="product-card"
              >
                <div className="product-image-container">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 260px"
                    loading="lazy"
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
        )}
      </div>
    </div>
  )
}

export default ProductListing



