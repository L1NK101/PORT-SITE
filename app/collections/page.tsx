'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { products } from '@/lib/data/products'

export default function CollectionsPage() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((product) => product.category)))],
    []
  )
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return products
    }
    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="pt-24 pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Explore collections
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Browse by curated categories with premium, high-intent products.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800/70"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {product.category}
                    </p>
                    <h2 className="font-semibold text-gray-900 dark:text-white mt-1">
                      {product.name}
                    </h2>
                    <p className="text-primary-600 dark:text-primary-400 font-bold mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
