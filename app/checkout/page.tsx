'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Check, CreditCard, DollarSign, Truck } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import CheckoutForm from '@/components/CheckoutForm'

type PaymentMethod = 'stripe' | 'paypal' | 'cod'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push('/products')}
            className="text-primary-600 hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const handleOrderComplete = () => {
    setOrderPlaced(true)
    clearCart()
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 pb-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Thank you for your purchase. You will receive a confirmation email shortly.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-500">Redirecting to homepage...</p>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: step >= s ? 1.1 : 1,
                        backgroundColor: step >= s ? '#6366f1' : '#e5e7eb',
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white mb-2"
                    >
                      {step > s ? <Check className="w-6 h-6" /> : s}
                    </motion.div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {s === 1 ? 'Details' : s === 2 ? 'Payment' : 'Review'}
                    </span>
                  </div>
                  {s < 3 && (
                    <div className="flex-1 h-1 mx-2 bg-gray-200 dark:bg-gray-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: step > s ? '100%' : '0%' }}
                        className="h-full bg-primary-600"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8"
              >
                {step === 1 && (
                  <CheckoutForm onNext={() => setStep(2)} />
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'stripe' as PaymentMethod, icon: CreditCard, label: 'Card', desc: 'Credit/Debit' },
                        { id: 'paypal' as PaymentMethod, icon: DollarSign, label: 'PayPal', desc: 'Pay with PayPal' },
                        { id: 'cod' as PaymentMethod, icon: Truck, label: 'Cash on Delivery', desc: 'Pay when delivered' },
                      ].map((method) => {
                        const Icon = method.icon
                        return (
                          <motion.button
                            key={method.id}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`p-6 rounded-xl border-2 transition-all ${
                              paymentMethod === method.id
                                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                          >
                            <Icon className={`w-8 h-8 mb-3 ${
                              paymentMethod === method.id ? 'text-primary-600' : 'text-gray-400'
                            }`} />
                            <div className="font-semibold text-gray-900 dark:text-white mb-1">
                              {method.label}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {method.desc}
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>

                    {paymentMethod === 'stripe' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Stripe integration placeholder. In production, integrate with Stripe Elements.
                        </p>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary-600 focus:outline-none bg-white dark:bg-gray-800"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary-600 focus:outline-none bg-white dark:bg-gray-800"
                            />
                            <input
                              type="text"
                              placeholder="CVV"
                              className="px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary-600 focus:outline-none bg-white dark:bg-gray-800"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          PayPal integration placeholder. In production, integrate with PayPal SDK.
                        </p>
                      </motion.div>
                    )}

                    {paymentMethod === 'cod' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                      >
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          You will pay when your order is delivered. Please have exact change ready.
                        </p>
                      </motion.div>
                    )}

                    <div className="flex gap-4 pt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 px-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(3)}
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/50 hover:shadow-xl transition-shadow"
                      >
                        Continue to Review
                      </motion.button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Order Review</h2>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-primary-600 dark:text-primary-400 font-bold mt-1">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span>Total</span>
                        <span className="text-primary-600 dark:text-primary-400">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(2)}
                        className="flex-1 py-3 px-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleOrderComplete}
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/50 hover:shadow-xl transition-shadow"
                      >
                        Place Order
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-primary-600 dark:text-primary-400 font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

