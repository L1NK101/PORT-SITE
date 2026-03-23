'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const stats = [
  { label: 'Curated Brands', value: '120+' },
  { label: 'Customer Satisfaction', value: '99%' },
  { label: 'Countries Served', value: '45' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="pt-24 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Built for modern premium shopping
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl"
          >
            Zone Store is a portfolio-grade commerce experience focused on
            speed, refined interaction design, and a premium visual language.
          </motion.p>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.07 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/60 p-6"
            >
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{item.value}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
