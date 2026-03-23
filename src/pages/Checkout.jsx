'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import Navbar from '../../components/Navbar'
import './Checkout.css'

const STEP_IDS = {
  details: 'details',
  payment: 'payment',
  review: 'review',
}

const CHECKOUT_STEPS = [
  { id: STEP_IDS.details, label: 'Details' },
  { id: STEP_IDS.payment, label: 'Payment' },
  { id: STEP_IDS.review, label: 'Review' },
]

const VALIDATION_MESSAGES = {
  emailRequired: 'Please enter your email address.',
  emailInvalid: 'Please enter a valid email address.',
  firstName: 'Please enter your first name.',
  lastName: 'Please enter your last name.',
  address: 'Please enter your street address.',
  city: 'Please enter your city.',
  zipCode: 'Please enter your zip code.',
  cardNumberRequired: 'Please enter your card number.',
  cardNumberInvalid: 'Card number should be 16 digits.',
  cardName: 'Please enter the cardholder name.',
  expiryDateRequired: 'Please enter the expiry date.',
  expiryDateInvalid: 'Use MM/YY format.',
  cvvRequired: 'Please enter the card CVV.',
  cvvInvalid: 'CVV should be 3 or 4 digits.',
}

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(STEP_IDS.details)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  if (cartItems.length === 0) {
    return (
      <div className="checkout">
        <Navbar />
        <div className="checkout-container">
          <p>Your cart is empty</p>
          <button onClick={() => router.push('/')} className="back-to-shop-button">
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === STEP_IDS.details) {
      if (!formData.email.trim()) {
        newErrors.email = VALIDATION_MESSAGES.emailRequired
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = VALIDATION_MESSAGES.emailInvalid
      }
      if (!formData.firstName.trim()) newErrors.firstName = VALIDATION_MESSAGES.firstName
      if (!formData.lastName.trim()) newErrors.lastName = VALIDATION_MESSAGES.lastName
      if (!formData.address.trim()) newErrors.address = VALIDATION_MESSAGES.address
      if (!formData.city.trim()) newErrors.city = VALIDATION_MESSAGES.city
      if (!formData.zipCode.trim()) newErrors.zipCode = VALIDATION_MESSAGES.zipCode
    }

    if (step === STEP_IDS.payment) {
      const cardDigits = formData.cardNumber.replace(/\D/g, '')
      if (!cardDigits) {
        newErrors.cardNumber = VALIDATION_MESSAGES.cardNumberRequired
      } else if (cardDigits.length < 16) {
        newErrors.cardNumber = VALIDATION_MESSAGES.cardNumberInvalid
      }
      if (!formData.cardName.trim()) newErrors.cardName = VALIDATION_MESSAGES.cardName
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = VALIDATION_MESSAGES.expiryDateRequired
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = VALIDATION_MESSAGES.expiryDateInvalid
      }
      const cvvDigits = formData.cvv.replace(/\D/g, '')
      if (!cvvDigits) {
        newErrors.cvv = VALIDATION_MESSAGES.cvvRequired
      } else if (cvvDigits.length < 3 || cvvDigits.length > 4) {
        newErrors.cvv = VALIDATION_MESSAGES.cvvInvalid
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep !== STEP_IDS.review || !validateStep(STEP_IDS.payment)) {
      return
    }

    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      alert('Order placed successfully! (This is a demo - no actual payment was processed)')
      router.push('/')
    }, 2000)
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping
  const stepIndex = CHECKOUT_STEPS.findIndex((step) => step.id === currentStep)

  const goToNextStep = () => {
    if (!validateStep(currentStep)) {
      return
    }
    if (currentStep === STEP_IDS.details) {
      setCurrentStep(STEP_IDS.payment)
      return
    }
    if (currentStep === STEP_IDS.payment) {
      setCurrentStep(STEP_IDS.review)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep === STEP_IDS.review) {
      setCurrentStep(STEP_IDS.payment)
      return
    }
    if (currentStep === STEP_IDS.payment) {
      setCurrentStep(STEP_IDS.details)
    }
  }

  const renderFieldError = (name) => {
    if (!errors[name]) return null
    return (
      <span id={`${name}-error`} className="error-message" role="alert">
        {errors[name]}
      </span>
    )
  }

  return (
    <div className="checkout">
      <Navbar />
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div className="checkout-steps" aria-label="Checkout progress">
          {CHECKOUT_STEPS.map((step, index) => {
            const isDone = index < stepIndex
            const isActive = currentStep === step.id
            const canNavigate = isDone || isActive
            return (
              <button
                key={step.id}
                type="button"
                className={`step-pill ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                disabled={!canNavigate}
                onClick={() => canNavigate && setCurrentStep(step.id)}
                aria-current={isActive ? 'step' : undefined}
              >
                <span>{index + 1}</span> {step.label}
              </button>
            )
          })}
        </div>
        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
          <div className="checkout-content">
            <div className="checkout-form-section">
              {currentStep === STEP_IDS.details && (
                <>
                  <h3>Contact Information</h3>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {renderFieldError('email')}
                  </div>

                  <h3>Shipping Address</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'error' : ''}
                        aria-invalid={Boolean(errors.firstName)}
                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      />
                      {renderFieldError('firstName')}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'error' : ''}
                        aria-invalid={Boolean(errors.lastName)}
                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      />
                      {renderFieldError('lastName')}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? 'error' : ''}
                      aria-invalid={Boolean(errors.address)}
                      aria-describedby={errors.address ? 'address-error' : undefined}
                    />
                    {renderFieldError('address')}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'error' : ''}
                        aria-invalid={Boolean(errors.city)}
                        aria-describedby={errors.city ? 'city-error' : undefined}
                      />
                      {renderFieldError('city')}
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">Zip Code *</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={errors.zipCode ? 'error' : ''}
                        aria-invalid={Boolean(errors.zipCode)}
                        aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
                      />
                      {renderFieldError('zipCode')}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </>
              )}

              {currentStep === STEP_IDS.payment && (
                <>
                  <h3>Payment Information</h3>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={errors.cardNumber ? 'error' : ''}
                      aria-invalid={Boolean(errors.cardNumber)}
                      aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
                    />
                    {renderFieldError('cardNumber')}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardName">Name on Card *</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={errors.cardName ? 'error' : ''}
                      aria-invalid={Boolean(errors.cardName)}
                      aria-describedby={errors.cardName ? 'cardName-error' : undefined}
                    />
                    {renderFieldError('cardName')}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className={errors.expiryDate ? 'error' : ''}
                        aria-invalid={Boolean(errors.expiryDate)}
                        aria-describedby={errors.expiryDate ? 'expiryDate-error' : undefined}
                      />
                      {renderFieldError('expiryDate')}
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        className={errors.cvv ? 'error' : ''}
                        aria-invalid={Boolean(errors.cvv)}
                        aria-describedby={errors.cvv ? 'cvv-error' : undefined}
                      />
                      {renderFieldError('cvv')}
                    </div>
                  </div>
                </>
              )}

              {currentStep === STEP_IDS.review && (
                <>
                  <h3>Review Your Order</h3>
                  <div className="review-card">
                    <p>
                      <strong>Contact:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>Shipping:</strong> {`${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.city}, ${formData.zipCode}, ${formData.country}`}
                    </p>
                    <p>
                      <strong>Payment:</strong> Card ending in {formData.cardNumber.replace(/\D/g, '').slice(-4) || '----'}
                    </p>
                  </div>
                </>
              )}

              <div className="checkout-navigation">
                <button
                  type="button"
                  className="step-nav-button secondary"
                  disabled={currentStep === STEP_IDS.details || isProcessing}
                  onClick={goToPreviousStep}
                >
                  Back
                </button>
                {currentStep !== STEP_IDS.review ? (
                  <button type="button" className="step-nav-button" onClick={goToNextStep}>
                    Continue
                  </button>
                ) : (
                  <button type="submit" className="place-order-button" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                )}
              </div>
            </div>

            <div className="checkout-summary">
              <h3>Order Summary</h3>
              <div className="checkout-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={70}
                      height={70}
                      loading="lazy"
                    />
                    <div className="checkout-item-info">
                      <p className="checkout-item-name">{item.name}</p>
                      <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <p className="checkout-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="checkout-totals">
                <div className="checkout-total-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="checkout-total-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="checkout-total-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout



