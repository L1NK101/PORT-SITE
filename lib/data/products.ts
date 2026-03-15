export interface Product {
  id: number
  name: string
  price: number
  image: string
  images?: string[]
  description: string
  category: string
  inStock: boolean
  featured?: boolean
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
    ],
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    category: 'Electronics',
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800',
    ],
    description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and smartphone connectivity. Stay connected on the go.',
    category: 'Electronics',
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Minimalist Backpack',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800',
    ],
    description: 'Sleek and functional backpack made from premium materials. Perfect for daily commute or travel adventures.',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: 4,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    ],
    description: 'Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.',
    category: 'Clothing',
    inStock: true,
  },
  {
    id: 5,
    name: 'Wireless Charging Pad',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800',
    ],
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design for your desk or nightstand.',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 6,
    name: 'Leather Wallet',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    ],
    description: 'Genuine leather wallet with RFID blocking technology. Slim design with multiple card slots and cash compartment.',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: 7,
    name: 'Running Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800',
    ],
    description: 'Lightweight running shoes with advanced cushioning technology. Perfect for daily runs and workouts.',
    category: 'Footwear',
    inStock: true,
  },
  {
    id: 8,
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
    ],
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly and durable.',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: 9,
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
    ],
    description: 'Portable Bluetooth speaker with 360-degree sound. Waterproof design perfect for outdoor adventures.',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 10,
    name: 'Yoga Mat',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
    ],
    description: 'Non-slip yoga mat with extra cushioning. Eco-friendly materials and easy to clean.',
    category: 'Fitness',
    inStock: true,
  },
  {
    id: 11,
    name: 'Sunglasses Classic',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
    ],
    description: 'Classic aviator sunglasses with UV400 protection. Timeless design with premium frame materials.',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: 12,
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    ],
    description: 'Ergonomic aluminum laptop stand with adjustable height. Improves posture and workspace organization.',
    category: 'Accessories',
    inStock: true,
  },
]

export const getProductById = (id: number | string): Product | undefined => {
  return products.find((product) => product.id === parseInt(String(id)))
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured)
}

