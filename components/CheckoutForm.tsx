'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CheckoutFormProps {
  onNext: () => void
}

export default function CheckoutForm({ onNext }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required'
    if (!formData.phone) newErrors.phone = 'Phone is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
      
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
            errors.email
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-200 dark:border-gray-700 focus:border-primary-600 dark:focus:border-primary-400'
          } bg-white dark:bg-gray-900`}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              errors.firstName
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 dark:border-gray-700 focus:border-primary-600 dark:focus:border-primary-400'
            } bg-white dark:bg-gray-900`}
          />
          {errors.firstName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.firstName}
            </motion.p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              errors.lastName
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 dark:border-gray-700 focus:border-primary-600 dark:focus:border-primary-400'
            } bg-white dark:bg-gray-900`}
          />
          {errors.lastName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.lastName}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
          Address *
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
            errors.address
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-200 dark:border-gray-700 focus:border-primary-600 dark:focus:border-primary-400'
          } bg-white dark:bg-gray-900`}
        />
        {errors.address && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.address}
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              errors.city
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 dark:border-gray-700 focus:border-primary-600 dark:focus:border-primary-400'
            } bg-white dark:bg-gray-900`}
          />
          {errors.city && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.city}
            </motion.p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Zip Code *
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              errors.zipCode
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 dark:border-gray-700 focus:border-primary-600 dark:focus:border-primary-400'
            } bg-white dark:bg-gray-900`}
          />
          {errors.zipCode && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.zipCode}
            </motion.p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 bg-white dark:bg-gray-900"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
          Phone *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
            errors.phone
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-200 dark:border-gray-700 focus:border-primary-600 dark:focus:border-primary-400'
          } bg-white dark:bg-gray-900`}
        />
        {errors.phone && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.phone}
          </motion.p>
        )}
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/50 hover:shadow-xl transition-shadow"
      >
        Continue to Payment
      </motion.button>
    </form>
  )
}

