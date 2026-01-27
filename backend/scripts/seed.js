import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const products = [
  {
    name: 'Royal Mahogany Bed',
    price: 45999,
    originalPrice: 64999,
    rating: 4.8,
    reviews: 156,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148150/f3928a86-9557-4dde-bd48-875650fba8af.png',
    category: 'Beds',
    tag: 'Best Seller',
    description: 'Experience the grandeur of the Royal Mahogany Bed. Carefully crafted from solid mahogany wood, this bed features intricate carvings and a rich finish that brings a touch of timeless elegance to your bedroom.',
    features: [
      'Material: Solid Mahogany Wood',
      'Finish: High-Gloss Varnish',
      'Style: Classic Victorian',
      'Warranty: 10 Years Structural',
      'Includes: Headboard, Footboard, and Rails'
    ],
    inStock: true,
    stockQuantity: 15
  },
  {
    name: 'Contemporary Panel Bed',
    price: 32999,
    originalPrice: 45999,
    rating: 4.5,
    reviews: 98,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148182/b4c4d303-0f27-43ef-a87b-ea296183ea2f.png',
    category: 'Beds',
    description: 'The Contemporary Panel Bed offers a sleek and modern look with its clean lines and minimalist design.',
    features: [
      'Material: Premium Engineered Wood',
      'Finish: Matte Oak Veneer',
      'Style: Modern Minimalist',
      'Storage: Optional Under-bed Drawers',
      'Assembly: Easy Quick-Lock System'
    ],
    inStock: true,
    stockQuantity: 20
  },
  {
    name: 'Elegant Upholstered Bed',
    price: 38999,
    originalPrice: 54999,
    rating: 4.7,
    reviews: 210,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148201/860a63d5-6d64-41df-9054-b4c775638a22.png',
    category: 'Beds',
    tag: 'New',
    description: 'Sleep in sophisticated comfort with our Elegant Upholstered Bed.',
    features: [
      'Material: Solid Wood Frame',
      'Upholstery: Premium Linen Fabric',
      'Headboard: Button Tufted Detail',
      'Support: Sturdy Wooden Slats',
      'Colors: Beige, Grey, and Navy'
    ],
    inStock: true,
    stockQuantity: 12
  },
  {
    name: 'Modern L-Shape Sofa Set',
    price: 52999,
    originalPrice: 74999,
    rating: 4.6,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    category: 'Sofas',
    tag: 'Best Seller',
    description: 'Spacious and comfortable L-shaped sofa perfect for modern living rooms.',
    features: [
      'Material: Premium Fabric',
      'Frame: Solid Wood',
      'Cushions: High-Density Foam',
      'Style: Contemporary',
      'Seating Capacity: 4-5 People'
    ],
    inStock: true,
    stockQuantity: 8
  },
  {
    name: 'Premium Leather Recliner',
    price: 42999,
    originalPrice: 59999,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
    category: 'Sofas',
    description: 'Luxurious leather recliner with premium comfort features.',
    features: [
      'Material: Genuine Leather',
      'Mechanism: Smooth Reclining',
      'Cushioning: Memory Foam',
      'Color: Brown, Black, Grey',
      'Warranty: 5 Years'
    ],
    inStock: true,
    stockQuantity: 10
  },
  {
    name: 'Luxury Wooden Dining Table',
    price: 65999,
    originalPrice: 89999,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500',
    category: 'Dining Tables',
    tag: 'Featured',
    description: 'Elegant dining table crafted from premium wood.',
    features: [
      'Material: Solid Teak Wood',
      'Seating: 6-8 People',
      'Finish: Natural Wood Polish',
      'Design: Extendable',
      'Dimensions: 180cm x 90cm'
    ],
    inStock: true,
    stockQuantity: 6
  },
  {
    name: 'Modern Coffee Table',
    price: 18999,
    originalPrice: 26999,
    rating: 4.4,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500',
    category: 'Coffee & Center Tables',
    description: 'Sleek coffee table with storage compartments.',
    features: [
      'Material: Engineered Wood',
      'Storage: Hidden Drawer',
      'Style: Modern',
      'Finish: Matte Black',
      'Dimensions: 120cm x 60cm'
    ],
    inStock: true,
    stockQuantity: 25
  },
  {
    name: 'Elegant Wooden Wardrobe',
    price: 52999,
    originalPrice: 74999,
    rating: 4.5,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500',
    category: 'Beds',
    description: 'Spacious wardrobe with multiple compartments.',
    features: [
      'Material: Solid Wood',
      'Storage: Multiple Shelves',
      'Doors: Sliding',
      'Mirror: Full Length',
      'Dimensions: 200cm x 150cm'
    ],
    inStock: true,
    stockQuantity: 7
  },
  // Additional Beds
  {
    name: 'Modern Storage Bed',
    price: 41999,
    originalPrice: 58999,
    rating: 4.6,
    reviews: 134,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148229/c4ad1c6f-a642-4cd9-a76c-85c312ef3be4.png',
    category: 'Beds',
    description: 'Maximize your bedroom space with the Modern Storage Bed.',
    features: [
      'Material: Metal & Wood Construction',
      'Mechanism: Heavy-duty Hydraulic Lift',
      'Storage: Full Under-bed Compartment',
      'Design: Low Profile Aesthetic',
      'Safety: Soft-close Mechanism'
    ],
    inStock: true,
    stockQuantity: 18
  },
  {
    name: 'Classic Queen Bed',
    price: 29999,
    originalPrice: 42999,
    rating: 4.4,
    reviews: 87,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148233/fd67c0ee-84f7-432a-afaa-8491c26f30be.png',
    category: 'Beds',
    description: 'A timeless piece, the Classic Queen Bed features traditional design elements.',
    features: [
      'Material: Solid Rubberwood',
      'Finish: Walnut Stain',
      'Style: Traditional',
      'Compatibility: Standard Queen Mattress',
      'Durability: Scratch-resistant Finish'
    ],
    inStock: true,
    stockQuantity: 22
  },
  // Additional Sofas
  {
    name: 'Luxury Leatherette Sofa',
    price: 55999,
    originalPrice: 78999,
    rating: 4.8,
    reviews: 89,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148395/757fe43c-e4e9-4cf6-84b5-940a9c0184df.png',
    category: 'Sofas',
    tag: 'Premium',
    description: 'Add a touch of class to your living room with this Luxury Leatherette Sofa.',
    features: [
      'Material: Premium Leatherette',
      'Frame: Kiln-dried Hardwood',
      'Cushioning: High-resilience Foam',
      'Seating: 3-Seater Spacious Design',
      'Legs: Chrome Plated Metal'
    ],
    inStock: true,
    stockQuantity: 12
  },
  {
    name: 'Modern Fabric Sofa',
    price: 38999,
    originalPrice: 54999,
    rating: 4.5,
    reviews: 120,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148423/e61d7192-4b0a-4442-be50-56aa0d01d892.png',
    category: 'Sofas',
    description: 'This Modern Fabric Sofa blends comfort with contemporary style.',
    features: [
      'Material: Woven Polyester Fabric',
      'Frame: Solid Wood & Plywood',
      'Style: Mid-century Modern',
      'Comfort: Medium-firm Support',
      'Includes: Two Matching Throw Pillows'
    ],
    inStock: true,
    stockQuantity: 15
  },
  {
    name: 'L-Shaped Corner Sofa',
    price: 65999,
    originalPrice: 92999,
    rating: 4.7,
    reviews: 78,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148441/5a8331f6-1cea-404f-a0d3-8b3e30ae46d6.png',
    category: 'Sofas',
    tag: 'Best Seller',
    description: 'Perfect for larger living spaces, this L-Shaped Corner Sofa provides ample seating.',
    features: [
      'Configuration: Left or Right Facing',
      'Material: Soft Chenille Fabric',
      'Structure: Modular Design',
      'Comfort: Deep Seat Cushions',
      'Base: Low-profile wooden block legs'
    ],
    inStock: true,
    stockQuantity: 9
  },
  // Dining Tables
  {
    name: '6-Seater Dining Set',
    price: 58999,
    originalPrice: 82999,
    rating: 4.7,
    reviews: 145,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148528/98e95d84-e4c7-4417-95c4-bbbc6fa98bfb.png',
    category: 'Dining',
    tag: 'Featured',
    description: 'Gather the whole family around this 6-Seater Dining Set.',
    features: [
      'Table Material: Solid Oak Wood',
      'Chairs: 6 Upholstered Chairs included',
      'Finish: Natural Wood Grain',
      'Style: Farmhouse Modern',
      'Durability: Heat & Scratch Resistant Top'
    ],
    inStock: true,
    stockQuantity: 8
  },
  {
    name: 'Compact 4-Seater Table',
    price: 32999,
    originalPrice: 46999,
    rating: 4.5,
    reviews: 88,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148547/101db244-299c-465e-ad3a-e1c1114b744f.png',
    category: 'Dining',
    description: 'Ideal for apartments or breakfast nooks, the Compact 4-Seater Table.',
    features: [
      'Shape: Rectangular Compact',
      'Material: Rubberwood & MDF',
      'Finish: Walnut/Black Two-tone',
      'Assembly: Simple Leg Attachment',
      'Ideal For: Small Spaces & Kitchens'
    ],
    inStock: true,
    stockQuantity: 20
  },
  {
    name: 'Premium Marble Dining',
    price: 85999,
    originalPrice: 119999,
    rating: 4.9,
    reviews: 42,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769148566/6811cd11-687b-42e2-94f2-c2cf1bb1ca1c.png',
    category: 'Dining',
    tag: 'Premium',
    description: 'Elevate your dining room with the opulence of the Premium Marble Dining table.',
    features: [
      'Top: Genuine White Marble',
      'Base: Polished Stainless Steel',
      'Capacity: Seats 6-8 People',
      'Maintenance: Sealed for Stain Resistance',
      'Weight: Heavy/Sturdy Construction'
    ],
    inStock: true,
    stockQuantity: 5
  },
  // Coffee & Center Tables
  {
    name: 'Designer Coffee Table',
    price: 15999,
    originalPrice: 22999,
    rating: 4.5,
    reviews: 178,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769149205/b1d2e040-e522-409c-a175-e51834a83c0f.png',
    category: 'Tables',
    tag: 'Trending',
    description: 'Complete your living room setup with the Designer Coffee Table.',
    features: [
      'Material: Metal & Tempered Glass',
      'Shape: Round / Geometric',
      'Style: Modern Glam',
      'Dimensions: 90cm Diameter',
      'Assembly: Pre-assembled'
    ],
    inStock: true,
    stockQuantity: 30
  },
  // Chairs
  {
    name: 'Ergonomic Office Chair',
    price: 12999,
    originalPrice: 18999,
    rating: 4.6,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
    category: 'Chairs',
    tag: 'Best Seller',
    description: 'Premium ergonomic office chair with lumbar support.',
    features: [
      'Material: Mesh Back & Fabric Seat',
      'Adjustability: Height, Armrest, Tilt',
      'Support: Lumbar Support System',
      'Base: 5-Star Nylon Base with Wheels',
      'Weight Capacity: 120kg'
    ],
    inStock: true,
    stockQuantity: 45
  },
  {
    name: 'Lounge Accent Chair',
    price: 18999,
    originalPrice: 26999,
    rating: 4.7,
    reviews: 92,
    image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1769499030/f237b728-e210-43c5-beae-f09077038e5c.png',
    category: 'Chairs',
    tag: 'New',
    description: 'Stylish lounge chair perfect for reading corners.',
    features: [
      'Material: Velvet Upholstery',
      'Frame: Solid Wood',
      'Style: Mid-Century Modern',
      'Comfort: Padded Seat & Back',
      'Colors: Multiple Options Available'
    ],
    inStock: true,
    stockQuantity: 18
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

    // Create a test admin user
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

    // Create a test user
    const userExists = await User.findOne({ email: 'user@casawood.com' });
    if (!userExists) {
      await User.create({
        name: 'Test User',
        email: 'user@casawood.com',
        password: 'user123',
        phone: '+91 9810707042'
      });
      console.log('Created test user: user@casawood.com / user123');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedProducts();
