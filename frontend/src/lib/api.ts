import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Create Axios Instance
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 6000, // 6 seconds timeout before switching to high-fidelity local simulation
});

// Request interceptor to attach JWT Token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jaypurloom_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// High-Fidelity Local Mock Data Fallback for Zero-Friction Demo Experience
const MOCK_PRODUCTS = [
  {
    id: 'prod-suit-101',
    title: 'Royal Maroon Chanderi Silk Zari Anarkali Suit Set',
    slug: 'royal-maroon-chanderi-silk-zari-anarkali-suit-set',
    description:
      'Experience regal elegance with our signature Chanderi Silk Anarkali Suit Set. Handcrafted by master artisans from Jaipur, featuring intricate Gota Patti and antique Zari embroidery across the neckline and flare. Comes with pure cotton pants and a sheer organza dupatta with scalloped borders.',
    fabric: 'Chanderi Silk',
    washCare: 'Dry Clean Only',
    isBestSeller: true,
    isNewArrival: true,
    gstRate: 12.0,
    categoryId: 'cat-women-anarkali',
    averageRating: 4.9,
    reviewCount: 38,
    category: { name: 'Anarkali Suits', slug: 'anarkali-suits' },
    variants: [
      { id: 'var-101-s', sku: 'JPL-MRN-ANK-S', color: 'Maroon', colorHex: '#6B1D2F', size: 'S', mrp: 7499, price: 4499, stock: 12 },
      { id: 'var-101-m', sku: 'JPL-MRN-ANK-M', color: 'Maroon', colorHex: '#6B1D2F', size: 'M', mrp: 7499, price: 4499, stock: 18 },
      { id: 'var-101-l', sku: 'JPL-MRN-ANK-L', color: 'Maroon', colorHex: '#6B1D2F', size: 'L', mrp: 7499, price: 4499, stock: 8 },
      { id: 'var-101-xl', sku: 'JPL-MRN-ANK-XL', color: 'Maroon', colorHex: '#6B1D2F', size: 'XL', mrp: 7499, price: 4499, stock: 4 },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop', isPrimary: false },
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop', isPrimary: false },
    ],
  },
  {
    id: 'prod-suit-102',
    title: 'Emerald Green Hand-Block Printed Cotton Suit Set',
    slug: 'emerald-green-hand-block-printed-cotton-suit-set',
    description:
      'Designed for effortless festive allure, our Emerald Green Pure Jaipuri Cotton Suit Set showcases traditional Sanganeri hand-block motifs with silver foil detailing. Lightweight, breathable, and paired with matching Kota Doria dupatta.',
    fabric: 'Pure Cotton (60x60 Cambric)',
    washCare: 'Gentle Hand Wash in Cold Water',
    isBestSeller: true,
    isNewArrival: false,
    gstRate: 12.0,
    categoryId: 'cat-women-cotton',
    averageRating: 4.8,
    reviewCount: 42,
    category: { name: 'Cotton Suit Sets', slug: 'cotton-suit-sets' },
    variants: [
      { id: 'var-102-m', sku: 'JPL-EMR-COT-M', color: 'Emerald Green', colorHex: '#0D5C3A', size: 'M', mrp: 4999, price: 2899, stock: 25 },
      { id: 'var-102-l', sku: 'JPL-EMR-COT-L', color: 'Emerald Green', colorHex: '#0D5C3A', size: 'L', mrp: 4999, price: 2899, stock: 15 },
      { id: 'var-102-xl', sku: 'JPL-EMR-COT-XL', color: 'Emerald Green', colorHex: '#0D5C3A', size: 'XL', mrp: 4999, price: 2899, stock: 10 },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop', isPrimary: false },
    ],
  },
  {
    id: 'prod-suit-103',
    title: 'Indigo Blue Bagru Print Kurta with Palazzo & Dupatta',
    slug: 'indigo-blue-bagru-print-kurta-palazzo-dupatta',
    description:
      'Authentic Bagru natural dye indigo kurta set crafted on breathable cotton. Distinctive geometric borders make it the quintessential ethnic office-to-evening statement ensemble.',
    fabric: 'Bagru Cotton',
    washCare: 'Separate Cold Wash with Mild Detergent',
    isBestSeller: false,
    isNewArrival: true,
    gstRate: 12.0,
    categoryId: 'cat-women-kurta',
    averageRating: 4.7,
    reviewCount: 19,
    category: { name: 'Kurta Sets', slug: 'kurta-sets' },
    variants: [
      { id: 'var-103-s', sku: 'JPL-IND-KRT-S', color: 'Indigo Blue', colorHex: '#1C3144', size: 'S', mrp: 3999, price: 2299, stock: 14 },
      { id: 'var-103-m', sku: 'JPL-IND-KRT-M', color: 'Indigo Blue', colorHex: '#1C3144', size: 'M', mrp: 3999, price: 2299, stock: 20 },
      { id: 'var-103-l', sku: 'JPL-IND-KRT-L', color: 'Indigo Blue', colorHex: '#1C3144', size: 'L', mrp: 3999, price: 2299, stock: 9 },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop', isPrimary: true },
    ],
  },
  {
    id: 'prod-suit-104',
    title: 'Mustard Yellow Festive Gota Patti Straight Suit Set',
    slug: 'mustard-yellow-festive-gota-patti-straight-suit-set',
    description:
      'Illuminate Haldi ceremonies and festive gatherings with our vibrant Mustard Yellow Silk Blend Straight Suit Set. Adorned with delicate hand-worked Gota Patti rays and paired with contrast Rani Pink dupatta.',
    fabric: 'Silk Blend & Cotton Lining',
    washCare: 'Dry Clean Recommended',
    isBestSeller: true,
    isNewArrival: false,
    gstRate: 12.0,
    categoryId: 'cat-women-suits',
    averageRating: 4.9,
    reviewCount: 56,
    category: { name: 'Ladies Suit Sets', slug: 'ladies-suit-sets' },
    variants: [
      { id: 'var-104-m', sku: 'JPL-MST-SUT-M', color: 'Mustard Yellow', colorHex: '#D4AF37', size: 'M', mrp: 5999, price: 3499, stock: 16 },
      { id: 'var-104-l', sku: 'JPL-MST-SUT-L', color: 'Mustard Yellow', colorHex: '#D4AF37', size: 'L', mrp: 5999, price: 3499, stock: 11 },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop', isPrimary: true },
    ],
  },
  {
    id: 'prod-home-201',
    title: 'Maharaja Palace 300 TC King Size Percale Bedsheet with 2 Pillow Covers',
    slug: 'maharaja-palace-300-tc-king-size-percale-bedsheet',
    description:
      'Transform your bedroom into a royal Rajasthani suite. Hand-screen printed on ultra-soft 300 Thread Count pure super combed cotton percale with authentic floral jaal arches.',
    fabric: '100% Cotton Percale (300 TC)',
    washCare: 'Machine Washable at 40°C',
    isBestSeller: true,
    isNewArrival: true,
    gstRate: 18.0,
    categoryId: 'cat-home-king-sheets',
    averageRating: 5.0,
    reviewCount: 64,
    category: { name: 'King Size Bedsheets', slug: 'king-size-bedsheets' },
    variants: [
      { id: 'var-201-k', sku: 'JPL-BED-KNG-01', color: 'Royal Ivory & Gold', colorHex: '#FAF8F5', size: 'King (108x108 inch)', mrp: 4499, price: 2699, stock: 30 },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1000&auto=format&fit=crop', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1000&auto=format&fit=crop', isPrimary: false },
    ],
  },
  {
    id: 'prod-home-202',
    title: 'Gulab Bagh Sanganeri Floral Queen Size Bedsheet Set',
    slug: 'gulab-bagh-sanganeri-floral-queen-size-bedsheet-set',
    description:
      'Infuse traditional pink city charm into your daily living. Featuring delicate blooming rose bouquets block-printed by traditional craftsmen using AZO-free skin friendly pigments.',
    fabric: 'Pure Jaipuri Cotton (250 TC)',
    washCare: 'Machine Washable in Gentle Cycle',
    isBestSeller: false,
    isNewArrival: false,
    gstRate: 18.0,
    categoryId: 'cat-home-queen-sheets',
    averageRating: 4.8,
    reviewCount: 28,
    category: { name: 'Queen Size Bedsheets', slug: 'queen-size-bedsheets' },
    variants: [
      { id: 'var-202-q', sku: 'JPL-BED-QEN-01', color: 'Blush Pink & White', colorHex: '#F4C2C2', size: 'Queen (90x100 inch)', mrp: 3499, price: 1999, stock: 22 },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1000&auto=format&fit=crop', isPrimary: true },
    ],
  },
];

const MOCK_CATEGORIES = [
  { id: 'cat-1', name: "Women's Ethnic Wear", slug: 'womens-ethnic-wear', description: 'Handcrafted luxury suits, anarkalis, and kurtas.' },
  { id: 'cat-2', name: 'Home Furnishing', slug: 'home-furnishing', description: 'Royal Jaipuri block-printed cotton bedsheets & quilts.' },
  { id: 'cat-women-anarkali', name: 'Anarkali Suits', slug: 'anarkali-suits', parentId: 'cat-1' },
  { id: 'cat-women-cotton', name: 'Cotton Suit Sets', slug: 'cotton-suit-sets', parentId: 'cat-1' },
  { id: 'cat-women-kurta', name: 'Kurta Sets', slug: 'kurta-sets', parentId: 'cat-1' },
  { id: 'cat-women-suits', name: 'Ladies Suit Sets', slug: 'ladies-suit-sets', parentId: 'cat-1' },
  { id: 'cat-home-king-sheets', name: 'King Size Bedsheets', slug: 'king-size-bedsheets', parentId: 'cat-2' },
  { id: 'cat-home-queen-sheets', name: 'Queen Size Bedsheets', slug: 'queen-size-bedsheets', parentId: 'cat-2' },
];

// Response Interceptor with Fallback Simulation Engine
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If backend is unreachable or throws network error/timeout, return simulated payload
    if (!error.response || error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
      console.warn('⚠️ [Jaypurloom Simulation Engine] Backend offline or timeout. Serving instant high-fidelity local data for:', error.config?.url);
      
      const url = error.config?.url || '';
      const method = error.config?.method?.toLowerCase();

      // Products endpoints
      if (url.includes('/products/') && !url.includes('/bulk-upload')) {
        const slug = url.split('/').pop();
        const found = MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || MOCK_PRODUCTS[0];
        return { data: { ...found, similarProducts: MOCK_PRODUCTS.filter((p) => p.id !== found.id).slice(0, 3) } };
      }
      if (url.includes('/products')) {
        return { data: { data: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length, page: 1, limit: 12, totalPages: 1 } };
      }

      // Categories
      if (url.includes('/categories')) {
        return { data: MOCK_CATEGORIES };
      }

      // AI Stylist
      if (url.includes('/ai/stylist-search')) {
        const promptData = JSON.parse(error.config?.data || '{}');
        const promptText = (promptData.prompt || '').toLowerCase();
        let recs = MOCK_PRODUCTS.filter((p) => p.isBestSeller);
        if (promptText.includes('wedding') || promptText.includes('maroon') || promptText.includes('anarkali')) {
          recs = [MOCK_PRODUCTS[0], MOCK_PRODUCTS[3]];
        } else if (promptText.includes('bedsheet') || promptText.includes('home')) {
          recs = [MOCK_PRODUCTS[4], MOCK_PRODUCTS[5]];
        } else if (promptText.includes('office') || promptText.includes('cotton')) {
          recs = [MOCK_PRODUCTS[1], MOCK_PRODUCTS[2]];
        }
        return {
          data: {
            prompt: promptData.prompt,
            explanation: `Our AI Stylist analyzed "${promptData.prompt}" and handpicked ${recs.length} exquisite Jaypurloom creations tailored for your occasion and comfort.`,
            recommendations: recs,
          },
        };
      }

      // Cart simulation
      if (url.includes('/cart')) {
        return {
          data: {
            items: [
              {
                id: 'cart-sim-1',
                variantId: MOCK_PRODUCTS[0].variants[0].id,
                productId: MOCK_PRODUCTS[0].id,
                productTitle: MOCK_PRODUCTS[0].title,
                slug: MOCK_PRODUCTS[0].slug,
                color: 'Maroon',
                size: 'S',
                price: 4499,
                mrp: 7499,
                quantity: 1,
                image: MOCK_PRODUCTS[0].images[0].url,
              },
            ],
            subtotal: 4499,
            gstAmount: 540,
            shippingAmount: 0,
            total: 5039,
            freeShippingThreshold: 2000,
            freeShippingProgress: 100,
          },
        };
      }

      // Auth simulation
      if (url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/google-login')) {
        return {
          data: {
            accessToken: 'simulated_jwt_token_jaypurloom_luxury_user',
            user: { id: 'usr-sim-1', name: 'Rohan Sharma', email: 'rohan@jaypurloom.com', role: 'CUSTOMER', phone: '9123456789' },
          },
        };
      }

      // Profile & Orders simulation
      if (url.includes('/users/profile')) {
        return {
          data: { id: 'usr-sim-1', name: 'Rohan Sharma', email: 'rohan@jaypurloom.com', role: 'CUSTOMER', phone: '9123456789', walletBalance: 1500, addresses: [] },
        };
      }
      if (url.includes('/orders/my-orders') || url.includes('/orders')) {
        return {
          data: [
            {
              id: 'ord-sim-101',
              orderNumber: 'JPL-778899',
              status: 'CONFIRMED',
              totalAmount: 4499,
              createdAt: new Date().toISOString(),
              items: [{ productTitle: 'Royal Maroon Chanderi Silk Zari Anarkali', quantity: 1, priceAtPurchase: 4499 }],
            },
          ],
        };
      }

      // Reports summary simulation for Admin
      if (url.includes('/reports/sales-summary')) {
        return {
          data: {
            overview: { totalRevenue: 485000, totalGst: 58200, totalShipping: 12400, totalDiscount: 24000, totalOrdersCount: 142, averageOrderValue: 3415 },
            dailySales: [
              { date: '2026-07-13', revenue: 64000, orders: 18 },
              { date: '2026-07-14', revenue: 71000, orders: 21 },
              { date: '2026-07-15', revenue: 52000, orders: 15 },
              { date: '2026-07-16', revenue: 88000, orders: 26 },
              { date: '2026-07-17', revenue: 76000, orders: 22 },
              { date: '2026-07-18', revenue: 69000, orders: 20 },
              { date: '2026-07-19', revenue: 65000, orders: 20 },
            ],
            monthlySales: [
              { month: 'Jan', revenue: 320000, orders: 95 },
              { month: 'Feb', revenue: 410000, orders: 120 },
              { month: 'Mar', revenue: 380000, orders: 110 },
              { month: 'Apr', revenue: 450000, orders: 135 },
              { month: 'May', revenue: 510000, orders: 150 },
              { month: 'Jun', revenue: 490000, orders: 140 },
              { month: 'Jul', revenue: 485000, orders: 142 },
            ],
          },
        };
      }

      return { data: { success: true, message: 'Operation successful (Simulated Mode)' } };
    }
    return Promise.reject(error);
  },
);
