export type ProductStatus = 'Active' | 'Draft' | 'Archived'

export interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  compareAt: number
  discount: number
  stock: number
  stockLimit: number
  sold: number
  rating: number
  reviews: number
  status: ProductStatus
  image: string
  gallery: string[]
  tags: string[]
  description: string
  createdAt: string
}

export const PRODUCT_CATEGORIES = [
  'Audio',
  'Peripherals',
  'Displays',
  'Furniture',
  'Lighting',
  'Wearables',
  'Accessories',
  'Cameras',
]

export const PRODUCT_STATUSES: ProductStatus[] = ['Active', 'Draft', 'Archived']

export function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Aurora Wireless Headphones Pro',
    sku: 'AUD-AUR-001',
    category: 'Audio',
    price: 2899000,
    compareAt: 3499000,
    discount: 17,
    stock: 148,
    stockLimit: 200,
    sold: 1240,
    rating: 4.9,
    reviews: 312,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['Bluetooth 5.3', 'ANC', '40h Battery'],
    description:
      '<p>Headphone over-ear dengan <strong>Active Noise Cancellation</strong> generasi terbaru, driver 40mm, dan baterai hingga 40 jam. Cocok untuk kerja fokus maupun monitoring audio.</p>',
    createdAt: '12 Jan 2026',
  },
  {
    id: 2,
    name: 'Nimbus Mechanical Keyboard 75%',
    sku: 'PER-NIM-002',
    category: 'Peripherals',
    price: 1450000,
    compareAt: 1750000,
    discount: 17,
    stock: 64,
    stockLimit: 150,
    sold: 860,
    rating: 4.7,
    reviews: 208,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['Hot-swap', 'QMK/VIA', 'Wireless'],
    description:
      '<p>Keyboard mekanikal 75% dengan <strong>hot-swap socket</strong>, gasket mount, dan dukungan QMK/VIA. Tersedia dalam tiga pilihan switch linear, tactile, dan clicky.</p>',
    createdAt: '03 Feb 2026',
  },
  {
    id: 3,
    name: 'Studio Display 27" 5K Retina',
    sku: 'DIS-STU-003',
    category: 'Displays',
    price: 12499000,
    compareAt: 13999000,
    discount: 11,
    stock: 12,
    stockLimit: 80,
    sold: 96,
    rating: 4.8,
    reviews: 47,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['5K Retina', 'P3 Wide', 'Thunderbolt'],
    description:
      '<p>Monitor 27 inci 5K Retina dengan akurasi warna P3, kecerahan 600 nits, dan satu kabel Thunderbolt untuk data, video, serta charging.</p>',
    createdAt: '18 Feb 2026',
  },
  {
    id: 4,
    name: 'Ergo Cloud Task Chair',
    sku: 'FUR-ERG-004',
    category: 'Furniture',
    price: 4350000,
    compareAt: 5200000,
    discount: 16,
    stock: 7,
    stockLimit: 60,
    sold: 310,
    rating: 4.6,
    reviews: 128,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['Lumbar Support', '4D Armrest', 'Mesh'],
    description:
      '<p>Kursi kerja ergonomis dengan sandaran mesh breathable, lumbar support adjustable, dan armrest 4D untuk sesi kerja panjang.</p>',
    createdAt: '25 Feb 2026',
  },
  {
    id: 5,
    name: 'Halo Desk Lamp Minimal',
    sku: 'LIG-HAL-005',
    category: 'Lighting',
    price: 890000,
    compareAt: 1100000,
    discount: 19,
    stock: 0,
    stockLimit: 120,
    sold: 540,
    rating: 4.5,
    reviews: 91,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['Dimmable', 'USB-C', 'Eye Care'],
    description:
      '<p>Lampu meja dengan suhu warna adjustable 2700K-6500K, sertifikasi bebas flicker, dan port USB-C untuk charging perangkat.</p>',
    createdAt: '04 Mar 2026',
  },
  {
    id: 6,
    name: 'Pulse Smart Watch Series 9',
    sku: 'WEA-PUL-006',
    category: 'Wearables',
    price: 3799000,
    compareAt: 4299000,
    discount: 12,
    stock: 54,
    stockLimit: 140,
    sold: 730,
    rating: 4.7,
    reviews: 264,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['AMOLED', 'GPS', 'ECG'],
    description:
      '<p>Smartwatch dengan layar AMOLED always-on, sensor ECG, GPS dual-band, dan daya tahan baterai hingga 7 hari.</p>',
    createdAt: '11 Mar 2026',
  },
  {
    id: 7,
    name: 'Trek Commuter Backpack 24L',
    sku: 'ACC-TRE-007',
    category: 'Accessories',
    price: 750000,
    compareAt: 950000,
    discount: 21,
    stock: 96,
    stockLimit: 180,
    sold: 410,
    rating: 4.4,
    reviews: 76,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['Water Resistant', 'Laptop 16"', 'Ergonomic'],
    description:
      '<p>Tas punggung 24 liter dengan kompartemen laptop 16 inci, bahan water-resistant, dan panel belakang breathable.</p>',
    createdAt: '17 Mar 2026',
  },
  {
    id: 8,
    name: 'Glide Wireless Mouse Ergo',
    sku: 'PER-GLI-008',
    category: 'Peripherals',
    price: 620000,
    compareAt: 780000,
    discount: 21,
    stock: 210,
    stockLimit: 250,
    sold: 980,
    rating: 4.5,
    reviews: 143,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['Silent Click', 'Multi-device', 'USB-C'],
    description:
      '<p>Mouse ergonomis dengan silent click, sensor 4000 DPI, dan konektivitas multi-device melalui dongle maupun Bluetooth.</p>',
    createdAt: '22 Mar 2026',
  },
  {
    id: 9,
    name: 'Frame 4K Mirrorless Camera',
    sku: 'CAM-FRA-009',
    category: 'Cameras',
    price: 18999000,
    compareAt: 21500000,
    discount: 12,
    stock: 4,
    stockLimit: 25,
    sold: 38,
    rating: 4.9,
    reviews: 29,
    status: 'Draft',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519183071298-a2962feb14f4?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['4K 60fps', 'IBIS', 'Dual Card'],
    description:
      '<p>Kamera mirrorless full-frame dengan video 4K 60fps, stabilisasi IBIS 5-axis, dan dual card slot untuk workflow profesional.</p>',
    createdAt: '28 Mar 2026',
  },
  {
    id: 10,
    name: 'Echo Studio Microphone USB-C',
    sku: 'AUD-ECH-010',
    category: 'Audio',
    price: 2150000,
    compareAt: 2450000,
    discount: 12,
    stock: 33,
    stockLimit: 90,
    sold: 190,
    rating: 4.6,
    reviews: 54,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['Cardioid', '24-bit', 'Zero Latency'],
    description:
      '<p>Mikrofon kondensor USB-C dengan pola cardioid, monitoring zero-latency, dan bodi metal untuk rekaman podcast maupun streaming.</p>',
    createdAt: '02 Apr 2026',
  },
  {
    id: 11,
    name: 'Slate Standing Desk 140cm',
    sku: 'FUR-SLA-011',
    category: 'Furniture',
    price: 5890000,
    compareAt: 6800000,
    discount: 13,
    stock: 18,
    stockLimit: 45,
    sold: 120,
    rating: 4.7,
    reviews: 63,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['Dual Motor', 'Memory Preset', 'Anti-collision'],
    description:
      '<p>Meja kerja adjustable 140x70cm dengan dual motor, empat memory preset, dan sensor anti-collision untuk keamanan.</p>',
    createdAt: '08 Apr 2026',
  },
  {
    id: 12,
    name: 'Orbit Portable Speaker Mini',
    sku: 'AUD-ORB-012',
    category: 'Audio',
    price: 540000,
    compareAt: 690000,
    discount: 22,
    stock: 0,
    stockLimit: 100,
    sold: 620,
    rating: 4.3,
    reviews: 87,
    status: 'Archived',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543474602-3ba1e34a2cbf?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['IPX7', '12h Play', 'Stereo Pair'],
    description:
      '<p>Speaker portabel tahan air IPX7 dengan driver 45mm, baterai 12 jam, dan mode stereo pairing untuk dua unit sekaligus.</p>',
    createdAt: '15 Apr 2026',
  },
]
