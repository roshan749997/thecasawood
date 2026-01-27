import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path to .env file (assuming script is in backend/scripts)
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedProduct = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const product = {
            name: 'King size storage bed',
            description: 'Premium King size storage bed with high quality Sarom Fabric and solid wood frame.',
            price: 54845,
            originalPrice: 65000,
            category: 'Beds',
            image: 'https://images.unsplash.com/photo-1505691938895-1cd5874a19ee?auto=format&fit=crop&w=800&q=80',
            images: [
                'https://images.unsplash.com/photo-1505691938895-1cd5874a19ee?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1505693375587-10220c529802?auto=format&fit=crop&w=800&q=80'
            ],
            inStock: true,
            stockQuantity: 10,
            rating: 4.8,
            reviews: 24,
            color: 'AMBER | 101',
            specifications: [
                { key: 'Size', value: 'King' },
                { key: 'Colour', value: 'AMBER | 101' },
                { key: 'Frame material', value: 'Solid wood & 18mm Plywood' },
                { key: 'Internal Finish', value: '0.8 mm white laminate' },
                { key: 'Upholstery Material', value: 'High quality Sarom Fabric' },
                { key: 'Hardware Use', value: 'Minifixes Dowels, Screws, Hinges' }
            ],
            colorOptions: ['AMBER 113', 'AMBER 119'],
            dimensionDetails: [
                {
                    title: 'Bed Dimensions',
                    items: [
                        { label: 'Outer width', value: '72"' },
                        { label: 'Full Length', value: '78"' }
                    ]
                },
                {
                    title: 'Headboard Dimensions',
                    items: [
                        { label: 'Outer width', value: '76"' },
                        { label: 'Height (from floor)', value: '42"' }
                    ]
                },
                {
                    title: 'Legs',
                    items: [
                        { label: 'Types', value: 'Wooden square shape 3"' }
                    ]
                },
                {
                    title: 'Storage',
                    items: [
                        { label: 'Type', value: 'Manual' }
                    ]
                }
            ],
            deliveryCondition: 'Expert Assembly (Within 4 days from delivery)',
            policies: {
                shipping: 'Directly from Factory/ Ware house, Delivered in multiple boxes',
                warranty: '1 year Manufacturing Warrenty',
                cancellations: 'Since Upholstered bed productions begins only after an order is placed. Cancellations are allowed free of charge only within first 24 hours of placing the order'
            }
        };

        // Delete existing to update formatting
        await Product.deleteOne({ name: 'King size storage bed' });

        const createdProduct = await Product.create(product);
        console.log('Product Seeded:', createdProduct.name);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

seedProduct();
