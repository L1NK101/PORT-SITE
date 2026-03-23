'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="pt-24 pb-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Returns Policy</h1>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4 text-gray-600 dark:text-gray-300">
            <p>Returns are accepted within 30 days of delivery.</p>
            <p>Items must be unused, with tags and original packaging.</p>
            <p>Refunds are processed to the original payment method in 5-7 business days.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
