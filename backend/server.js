import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import wishlistRoutes from './routes/wishlist.js';
import orderRoutes from './routes/orders.js';
import addressRoutes from './routes/addresses.js';
import userRoutes from './routes/users.js';
import paymentRoutes from './routes/payment.js';
import fabricRoutes from './routes/fabrics.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fix for Google Auth Cross-Origin-Opener-Policy
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// Root route (so visiting backend URL doesn't 404)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Casawood API',
    docs: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders'
    }
  });
});

// Avoid 404 for browser favicon request
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/fabrics', fabricRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Casawood API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/casawood';

    // Extract cluster/database info from URI for logging
    const uriMatch = mongoUri.match(/mongodb\+srv:\/\/[^@]+@([^/]+)\/([^?]+)/);
    const clusterName = uriMatch ? uriMatch[1] : 'localhost';
    const dbNameFromUri = uriMatch ? uriMatch[2] : 'casawood';

    const conn = await mongoose.connect(mongoUri);
    const actualDbName = conn.connection.name;

    // Verify database name matches
    if (dbNameFromUri !== actualDbName) {
      console.warn(`⚠️  Warning: URI specifies "${dbNameFromUri}" but connected to "${actualDbName}"`);
    }

    console.log(`MongoDB Connected Successfully:`);
    console.log(`  - Cluster: ${clusterName}`);
    console.log(`  - Database (from URI): ${dbNameFromUri}`);
    console.log(`  - Database (actual): ${actualDbName}`);
    console.log(`  - Connection Host: ${conn.connection.host}`);
    console.log(`  - Ready State: ${conn.connection.readyState === 1 ? 'Connected ✓' : 'Disconnected ✗'}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

export default app;
