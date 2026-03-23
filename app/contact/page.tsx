'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="pt-24 pb-20">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact us</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Share your feedback or collaboration ideas for Zone Store.
          </p>

          <form
            className="space-y-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/60 p-6"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                Name
              </label>
              <input id="name" required className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                Email
              </label>
              <input id="email" type="email" required className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="message">
                Message
              </label>
              <textarea id="message" rows={5} required className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
            </div>
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium">
              Send Message
            </button>
            {submitted && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Message sent. Thanks for reaching out.
              </p>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}
