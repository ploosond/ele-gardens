import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import logger from './utils/logger.js';
import middleware from './utils/middleware.js';

import testRouter from './routes/test.js';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import employeeRouter from './routes/employee.js';
import contactRouter from './routes/contact.js';
import newsletterRouter from './routes/newsletter.js';

const app = express();

import 'express-async-errors';

mongoose.set('strictQuery', false);

connectDB()
  .then((conn) => {
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  })
  .catch((error) => {
    logger.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React
app.use(express.static(path.join(__dirname, 'dist')));

// Serve uploaded profile pictures statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(middleware.tokenExtractor);

app.use('/api/ping', testRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/newsletter', newsletterRouter);

// Catch-all to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(middleware.unknownRequest);
app.use(middleware.errorHandler);

export default app;
