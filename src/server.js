import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './Routes/authRoutes.js';
import taskRoutes from './Routes/taskRoutes.js';
import { errorHandler } from './Middleware/errorHandler.js';
import morgan from 'morgan'
dotenv.config();

const PORT = process.env.PORT || 3000;

const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth',authRoutes);
app.use('/api/task',taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});