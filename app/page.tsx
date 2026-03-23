'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <Navbar />
      <Hero />
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Fast Delivery', text: 'Tracked shipping with premium packaging.' },
              { title: 'Secure Checkout', text: 'Trusted payment flow and encrypted transactions.' },
              { title: 'Curated Selection', text: 'Only high-quality products for modern lifestyle.' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-800/60"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{feature.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/collections" className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium">
              Explore Collections
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              Learn About Zone Store
            </Link>
            <Link href="/contact" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              Contact Team
            </Link>
          </div>
        </div>
      </section>
      <ProductGrid />
      <Footer />
    </motion.main>
  )
}

