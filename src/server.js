import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './Routes/authRoutes.js'
dotenv.config();

const PORT = process.env.PORT || 3000;

const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});