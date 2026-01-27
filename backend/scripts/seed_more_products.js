import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedMoreProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const products = [
            {
                name: 'Centre Table',
                description: 'Elegant Oval Centre Table crafted with Plywood and Italian Top laminate finish.',
                category: 'Coffee & Center Tables',
                price: 25499,
                originalPrice: 32000,
                image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80'
                ],
                inStock: true,
                rating: 4.5,
                reviews: 8,
                specifications: [
                    { key: 'Material', value: 'Plywood' },
                    { key: 'Finish', value: 'Laminates' },
                    { key: 'Table Top Material', value: 'Italian Top' },
                    { key: 'Shape', value: 'Oval' }
                ],
                dimensionDetails: [
                    {
                        title: 'Table Dimensions',
                        items: [
                            { label: 'Dimensions', value: 'L 48" × W 24" × H 18"' }
                        ]
                    }
                ],
                deliveryCondition: 'Expert Assembly (Within 4 days from delivery)',
                policies: {
                    shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
                    warranty: '1 year Manufacturing Warrenty',
                    cancellations: 'Since Upholstered sofa productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
                }
            },
            {
                name: '6 seater dinning table',
                description: 'Luxurious 6-seater Teak wood dining table with Italian table top and cushioned chairs.',
                category: 'Dining Tables',
                price: 84993,
                originalPrice: 95000,
                image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
                ],
                inStock: true,
                rating: 4.8,
                reviews: 14,
                features: [
                    'Premium Teak wood',
                    'Italian table top',
                    'Cushion chairs with teakwood Frame'
                ],
                specifications: [
                    { key: 'Material', value: 'Teak wood' },
                    { key: 'Seater', value: '6 seater' },
                    { key: 'Finish', value: 'Teak Finish' },
                    { key: 'Shape', value: 'Oval' },
                    { key: 'Option', value: '4 seater available' },
                    { key: 'Price (4 seater)', value: '₹75,993' }
                ],
                dimensionDetails: [
                    {
                        title: 'Table Dimensions',
                        items: [
                            { label: 'Dimensions', value: '72 L × 36 W × 31 H' }
                        ]
                    },
                    {
                        title: 'Chair Dimensions',
                        items: [
                            { label: 'Dimensions', value: '24 L × 19 W × 40' }
                        ]
                    }
                ],
                deliveryCondition: 'Expert Assembly (Within 4 days from delivery)',
                policies: {
                    shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
                    warranty: '1 year Manufacturing Warrenty',
                    cancellations: 'Since Upholstered sofa productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
                }
            },
            {
                name: 'Lounge chair',
                description: 'Comfortable Lounge chair in Velveto fabric with low back support.',
                category: 'Lounge chair',
                price: 19985,
                originalPrice: 24000,
                image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80'
                ],
                inStock: true,
                rating: 4.6,
                reviews: 6,
                color: 'Velveto 927',
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
                dimensionDetails: [
                    {
                        title: 'Product Dimensions',
                        items: [
                            { label: 'Dimensions', value: '30 L × 34 W × 35 H' }
                        ]
                    }
                ],
                deliveryCondition: 'pre - Assembled',
                policies: {
                    shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
                    warranty: '1 year Manufacturing Warrenty',
                    cancellations: 'Since Upholstered sofa productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
                }
            }
        ];

        for (const p of products) {
            // Delete existing to update
            await Product.deleteMany({ name: p.name, category: p.category });
            const created = await Product.create(p);
            console.log(`Seeded: ${created.name} (${created.category})`);
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

seedMoreProducts();
