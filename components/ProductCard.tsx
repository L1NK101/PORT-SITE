'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'
import { Product } from '@/lib/data/products'
import { useCartStore } from '@/lib/store/cartStore'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)
  const [isHovered, setIsHovered] = useState(false)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const rect = e.currentTarget.getBoundingClientRect()
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    
    setTimeout(() => setRipple(null), 600)
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    
    openCart()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            {/* Overlay Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Quick view"
              >
                <Eye className="w-5 h-5 text-gray-900" />
              </motion.button>
            </motion.div>

            {/* Stock Badge */}
            {!product.inStock && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Out of Stock
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-5">
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ${product.price.toFixed(2)}
              </p>
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-3 rounded-full transition-all ${
                  product.inStock
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {ripple && (
                  <motion.span
                    className="absolute rounded-full bg-white/30"
                    initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
                    animate={{ width: 100, height: 100, x: ripple.x - 50, y: ripple.y - 50 }}
                    exit={{ opacity: 0 }}
                    style={{ pointerEvents: 'none' }}
                  />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

