import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const products = [
  // 1. BED (From User Data)
  {
    name: 'King size storage bed',
    price: 54845,
    originalPrice: 74999,
    rating: 4.8,
    reviews: 42,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148150/f3928a86-9557-4dde-bd48-875650fba8af.png', // Placeholder
    category: 'Beds',
    tag: 'Best Seller',
    description: 'Beds are essential furniture pieces designed for sleep and relaxation, typically consisting of a mattress on a frame. They come in various sizes like single, double, queen, and king, featuring materials such as wood, metal, or upholstered fabrics.',
    features: ['Solid wood & 18mm Plywood Frame', 'Manual Storage', 'Expert Assembly'],
    specifications: [
      { key: 'Size', value: 'King' },
      { key: 'Colour', value: 'AMBER | 101' },
      { key: 'Frame material', value: 'Solid wood & 18mm Plywood' },
      { key: 'Internal Finish', value: '0.8 mm white laminate' },
      { key: 'Upholstery Material', value: 'High quality Sarom Fabric' },
      { key: 'Hardware Use', value: 'Minifixes Dowels, Screws, Hinges' },
      { key: 'Storage', value: 'Manual' },
      { key: 'Legs', value: 'Wooden square shape 3"' }
    ],
    colorOptions: ['AMBER 113', 'AMBER 119'],
    dimensions: {
      length: 78,
      width: 72,
      height: 42,
      unit: 'inch'
    },
    isActive: true,
    policies: {
      shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
      warranty: '1 year Manufacturing Warranty',
      cancellations: 'Since Upholstered bed productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
    },
    deliveryCondition: 'Expert Assembly (Within 4 days from delivery)'
  },

  // 2. SOFA (From User Data)
  {
    name: '3 seater sofa',
    price: 56499,
    originalPrice: 69999,
    rating: 4.6,
    reviews: 89,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148395/757fe43c-e4e9-4cf6-84b5-940a9c0184df.png',
    category: 'Polyester Fabric Sofas',
    tag: 'Trending',
    description: 'Expertly crafted polyester fabric sofa available in multiple seating options. Features high-quality upholstery and teak wood legs.',
    features: ['Teak wood & 18mm Plywood Frame', 'Duroflex Foam', 'Teakwood Legs', 'Polyester Fabric'],
    specifications: [
      { key: 'Colour', value: 'KEIBA 901' },
      { key: 'Frame material', value: 'Teak wood & 18mm Plywood' },
      { key: 'Upholstery Material', value: 'High quality Fabric' },
      { key: 'Material', value: 'Polyester Fabric' },
      { key: 'Foam', value: 'Duroflex' },
      { key: 'Legs', value: 'Teakwood' }
    ],
    colorOptions: ['KEIBA 903', 'KEIBA 907'],
    variants: [
      { name: '1 seater', price: 18545, dimensions: '30 L × 33 W × 18 H' },
      { name: '2 seater', price: 42000, dimensions: '72 L × 33 W × 18 H' },
      { name: '3 seater', price: 56499, dimensions: '96 L × 33 W × 18 H' }
    ],
    fabricTypes: ['KEIBA', 'VELVETO'],
    defaultFabric: 'KEIBA',
    defaultColor: '901',
    dimensions: { length: 96, width: 33, height: 18, unit: 'inch' }, // Default 3 seater
    isActive: true,
    policies: {
      shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
      warranty: '1 year Manufacturing Warranty',
      cancellations: 'Since Upholstered sofa productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
    },
    deliveryCondition: 'pre - Assembled'
  },
  {
    name: 'L shape',
    price: 91499,
    originalPrice: 110000,
    rating: 4.8,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500', // Placeholder
    category: 'Leatherette Sofas',
    description: 'Luxurious L-shaped leatherette sofa tailored for comfort and style.',
    features: ['Teak wood & 18mm Plywood Frame', 'Duroflex Foam', 'Metal Legs', 'Leatherette Material'],
    specifications: [
      { key: 'Size', value: '3 seater + Lounger' },
      { key: 'Colour', value: 'MERRY 703' },
      { key: 'Frame material', value: 'Teak wood & 18mm Plywood' },
      { key: 'Upholstery Material', value: 'High quality Fabric' }, // User said Fabric under Upholstery but Material Leatherette? sticking to request
      { key: 'Material', value: 'Leatherette' },
      { key: 'Foam', value: 'Duroflex' },
      { key: 'Legs', value: 'Metal' }
    ],
    colorOptions: ['MERRY 705', 'MERRY 706', 'MERRY 734'],
    fabricTypes: ['MERRY', 'ABOONE'],
    defaultFabric: 'MERRY',
    defaultColor: '703',
    dimensionDetails: [
      { title: '3 Seater', items: [{ label: 'Dimensions', value: '84 L × 33 W × 18 H' }] },
      { title: 'Lounger', items: [{ label: 'Dimensions', value: '78 L × 35 W × 18 H' }] }
    ],
    isActive: true,
    policies: {
      shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
      warranty: '1 year Manufacturing Warranty',
      cancellations: 'Since Upholstered sofa productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
    },
    deliveryCondition: 'Expert Assembly (Within 4 days from delivery)'
  },

  // 3. CENTER TABLE (From User Data)
  {
    name: 'Centre Table',
    price: 25499,
    originalPrice: 35000,
    rating: 4.5,
    reviews: 34,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769149205/b1d2e040-e522-409c-a175-e51834a83c0f.png', // Placeholder
    category: 'Coffee & Center Tables',
    description: 'Coffee and center tables are low tables placed in front of sofas to hold drinks, books, or decor. They serve as a focal point in living rooms, available in various shapes, materials (wood, glass, metal), and styles.',
    features: ['Italian Top', 'Oval Shape', 'Plywood Material'],
    specifications: [
      { key: 'Material', value: 'Plywood' },
      { key: 'Finish', value: 'Laminates' },
      { key: 'Table Top Material', value: 'Italian Top' },
      { key: 'Shape', value: 'Oval' }
    ],
    dimensions: {
      length: 48,
      width: 24,
      height: 18,
      unit: 'inch'
    },
    isActive: true,
    policies: {
      shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
      warranty: '1 year Manufacturing Warranty',
      cancellations: 'Since Upholstered sofa productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
    },
    deliveryCondition: 'Expert Assembly (Within 4 days from delivery)'
  },

  // 4. DINING TABLE (From User Data)
  {
    name: '6 seater dinning table',
    price: 84993,
    originalPrice: 105000,
    rating: 4.9,
    reviews: 12,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148528/98e95d84-e4c7-4417-95c4-bbbc6fa98bfb.png', // Placeholder
    category: 'Dining Tables',
    tag: 'Premium',
    description: 'Premium dining table set feautring teak wood construction and an Italian table top. Includes cushion chairs with teakwood frames.',
    features: ['Premium Teak wood', 'Italian table top', 'Cushion chairs with teakwood Frame', 'Oval Shape'],
    specifications: [
      { key: 'Material', value: 'Teak wood' },
      { key: 'Finish', value: 'Teak Finish' },
      { key: 'Shape', value: 'Oval' },
      { key: 'Chair Dimensions', value: '24 L × 19 W × 40 H' }
    ],
    variants: [
      { name: '4 seater', price: 75993, dimensions: 'Contact Support for Sizes' },
      { name: '6 seater', price: 84993, dimensions: '72 L × 36 W × 31 H' }
    ],
    dimensions: {
      length: 72,
      width: 36,
      height: 31,
      unit: 'inch'
    },
    isActive: true,
    policies: {
      shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
      warranty: '1 year Manufacturing Warranty',
      cancellations: 'Since Upholstered sofa productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
    },
    deliveryCondition: 'Expert Assembly (Within 4 days from delivery)'
  },

  // 5. LOUNGE CHAIR (From User Data)
  {
    name: 'Lounge chair',
    price: 19985,
    originalPrice: 24999,
    rating: 4.7,
    reviews: 56,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769499030/f237b728-e210-43c5-beae-f09077038e5c.png', // Placeholder
    category: 'Lounge chair',
    tag: 'New',
    description: 'Lounge chairs are designed for relaxation and comfort, often featuring reclined backs and plush cushioning. Ideal for reading or resting, they add style to living rooms, bedrooms, or reading nooks.',
    features: ['Teak wood Frame', 'Velvet Material', 'Duroflex Foam'],
    specifications: [
      { key: 'Colour', value: 'Velveto 927' },
      { key: 'Frame material', value: 'Teak wood' },
      { key: 'Upholstery Material', value: 'High quality Fabric' },
      { key: 'Material', value: 'Velvet' },
      { key: 'Foam', value: 'Duroflex' },
      { key: 'Legs', value: 'Teakwood' },
      { key: 'Back Rest', value: 'Low back' },
      { key: 'Note', value: 'Cushions not included' }
    ],
    dimensions: {
      length: 30,
      width: 34,
      height: 35,
      unit: 'inch'
    },
    isActive: true,
    policies: {
      shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
      warranty: '1 year Manufacturing Warranty',
      cancellations: 'Since Upholstered sofa productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
    },
    deliveryCondition: 'pre - Assembled'
  },

  // 6. Leatherette Sofa (Dummy)
  {
    name: 'Classic Leatherette Recliner',
    price: 32000,
    originalPrice: 45000,
    rating: 4.4,
    reviews: 20,
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=500',
    category: 'Leatherette Sofas',
    description: 'A comfortable leatherette recliner perfect for your home theater.',
    features: ['Reclining Mechanism', 'Leatherette Upholstery'],
    specifications: [
      { key: 'Material', value: 'Leatherette' },
      { key: 'Color', value: 'Black' }
    ],
    isActive: true
  },



  // 8. Chairs (Dummy)
  {
    name: 'Wooden Studying Chair',
    price: 4500,
    originalPrice: 6000,
    rating: 4.2,
    reviews: 10,
    image: 'https://images.unsplash.com/photo-1519947486511-4639940be434?w=500',
    category: 'Chairs',
    description: 'Simple wooden chair for study desks.',
    features: ['Solid Wood', 'Ergonomic Design'],
    specifications: [
      { key: 'Material', value: 'Sheesham Wood' },
      { key: 'Finish', value: 'Walnut' }
    ],
    isActive: true
  }

];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/casawood');
    console.log('MongoDB Connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    // Create a test admin user (Idempotent)
    const adminExists = await User.findOne({ email: 'admin@casawood.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@casawood.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91 9876543210'
      });
      console.log('Created admin user: admin@casawood.com / admin123');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedProducts();
