# Zone Store - Premium E-Commerce Website

A premium, animated e-commerce website built with Next.js, featuring smooth animations, modern UI/UX, and a luxury shopping experience.

## 🚀 Features

- **Premium Design**: Luxury feel with smooth animations and modern aesthetics
- **Smooth Animations**: Framer Motion powered animations throughout
- **Dark Mode**: Animated theme toggle with smooth transitions
- **Shopping Cart**: Slide-out drawer with spring animations
- **Product Gallery**: Animated image transitions and hover effects
- **Checkout Flow**: Multi-step checkout with progress indicators
- **Payment Integration**: Ready for Stripe, PayPal, and Cash on Delivery
- **Responsive**: Fully responsive, mobile-first design
- **Performance**: Optimized for 60fps animations

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **Zustand** (State Management)
- **Lucide React** (Icons)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Key Components

- **Navbar**: Sticky navbar with blur backdrop and animated cart badge
- **Hero**: Animated hero section with parallax effects
- **ProductGrid**: Staggered product card animations
- **ProductCard**: Hover effects with image zoom and ripple animations
- **CartDrawer**: Slide-out cart with spring animations
- **Checkout**: Multi-step checkout with progress bar
- **ThemeProvider**: Dark/light mode with smooth transitions

## 💳 Payment Integration

The checkout page includes placeholders for:
- Stripe (Credit/Debit Cards)
- PayPal
- Cash on Delivery

To integrate real payments, replace the placeholder components with actual SDK implementations.

## 🎯 Animation Features

- Page transitions with fade effects
- Staggered product grid animations
- Smooth hover interactions
- Spring-based cart drawer
- Ripple effects on buttons
- Progress bar animations
- Theme toggle animations

## 📱 Responsive Design

Fully responsive across all device sizes:
- Mobile-first approach
- Tablet optimizations
- Desktop enhancements
- Touch-friendly interactions

## 🌙 Dark Mode

- System preference detection
- Manual toggle
- Smooth transitions
- Persistent storage

## 📝 Environment Variables

Create a `.env.local` file for production:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_id
```

## 🚀 Deployment

The site is ready to deploy on:
- Vercel (Recommended)
- Netlify
- Any Node.js hosting platform

## 📄 License

MIT License - feel free to use this project for your own purposes.

