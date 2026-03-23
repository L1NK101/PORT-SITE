'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, Plus, Minus, ShoppingCart, Check } from 'lucide-react'
import { getProductById } from '@/lib/data/products'
import { useCartStore } from '@/lib/store/cartStore'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const rawId = params?.id
  const productId = Array.isArray(rawId) ? rawId[0] : rawId
  const product = productId ? getProductById(productId) : null
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button
            onClick={() => router.push('/products')}
            className="text-primary-600 hover:underline"
          >
            Back to products
          </button>
        </div>
      </div>
    )
  }

  const images = product.images || [product.image]

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }, quantity)
    
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
      openCart()
    }, 1500)
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }, quantity)
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-primary-600 dark:border-primary-400'
                          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-2">
                  {product.category}
                </p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  {product.name}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-6"
                >
                  ${product.price.toFixed(2)}
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {product.description}
              </motion.p>

              {/* Stock Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {product.inStock ? (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 font-semibold">
                    Out of Stock
                  </span>
                )}
              </motion.div>

              {/* Quantity Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-4"
              >
                <label className="font-semibold text-gray-900 dark:text-white">
                  Quantity:
                </label>
                <div className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="w-12 text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addedToCart}
                  whileHover={product.inStock && !addedToCart ? { scale: 1.02 } : {}}
                  whileTap={product.inStock && !addedToCart ? { scale: 0.98 } : {}}
                  className={`relative flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : product.inStock
                      ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {addedToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </span>
                  )}
                  {ripple && (
                    <motion.span
                      className="absolute rounded-full bg-white/30"
                      initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
                      animate={{ width: 200, height: 200, x: ripple.x - 100, y: ripple.y - 100 }}
                      exit={{ opacity: 0 }}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </motion.button>
                <motion.button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  whileHover={product.inStock ? { scale: 1.02 } : {}}
                  whileTap={product.inStock ? { scale: 0.98 } : {}}
                  className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/50 hover:shadow-xl transition-shadow ${
                    !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Buy Now
                </motion.button>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200 dark:border-gray-800"
              >
                {[
                  { title: 'Free Shipping', desc: 'On orders over $50' },
                  { title: '30-Day Returns', desc: 'Hassle-free' },
                  { title: 'Secure Payment', desc: '100% secure' },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

