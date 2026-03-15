'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <Navbar />
      <div className="pt-20">
        <ProductGrid />
      </div>
      <Footer />
    </motion.main>
  )
}

