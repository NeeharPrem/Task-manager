import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config();

const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
.then(() => logger.info('MongoDB connected'))
.catch(err => logger.error('MongoDB connection error:', err));

