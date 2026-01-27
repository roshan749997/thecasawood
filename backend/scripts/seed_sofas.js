import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedSofas = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const products = [
            {
                name: '3 seater sofa',
                description: 'Premium Leatherette 3 seater sofa designed for comfort and style.',
                price: 56499,
                originalPrice: 68000,
                category: 'Leatherette Sofas',
                image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
                ],
                inStock: true,
                stockQuantity: 15,
                rating: 4.7,
                reviews: 10,
                color: 'MERRY 738',
                colorOptions: ['MERRY 734', 'MERRY 705', 'MERRY 706'],
                specifications: [
                    { key: 'Size', value: '3 seater' },
                    { key: 'Colour', value: 'MERRY 738' },
                    { key: 'Frame material', value: 'Teak wood & 18mm Plywood' },
                    { key: 'Upholstery Material', value: 'High quality Fabric' },
                    { key: 'Material', value: 'Leatherate' },
                    { key: 'Foam', value: 'Duroflex' },
                    { key: 'Legs', value: 'Metal' }
                ],
                dimensionDetails: [
                    {
                        title: 'Product Dimensions',
                        items: [
                            { label: 'Overall', value: '96 L × 33 W × 18 H' }
                        ]
                    }
                ],
                deliveryCondition: 'pre - Assembled',
                policies: {
                    shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
                    warranty: '1 year Manufacturing Warrenty',
                    cancellations: 'Since Upholstered sofa productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
                }
            },
            {
                name: '3 seater sofa',
                description: 'Elegant Polyester Fabric 3 seater sofa, perfect for modern living rooms.',
                price: 56499,
                originalPrice: 65000,
                category: 'Polyester Fabric Sofas',
                image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80',
                images: [
                    'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80'
                ],
                inStock: true,
                stockQuantity: 20,
                rating: 4.5,
                reviews: 15,
                color: 'KEIBA 901',
                colorOptions: ['KEIBA 903', 'KEIBA 907'],
                specifications: [
                    { key: 'Size', value: '3 seater' },
                    { key: 'Colour', value: 'KEIBA 901' },
                    { key: 'Frame material', value: 'Teak wood & 18mm Plywood' },
                    { key: 'Upholstery Material', value: 'High quality Fabric' },
                    { key: 'Material', value: 'polyster Fabric' },
                    { key: 'Foam', value: 'Duroflex' },
                    { key: 'Legs', value: 'Teakwood' }
                ],
                dimensionDetails: [
                    {
                        title: 'Product Dimensions',
                        items: [
                            { label: 'Overall', value: '96 L × 33 W × 18 H' }
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

        // Ensure these specific products don't duplicate excessively if run multiple times
        // We delete by NAME and CATEGORY to be safe.
        for (const p of products) {
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

seedSofas();
