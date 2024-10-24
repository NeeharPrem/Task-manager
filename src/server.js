import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './Routes/authRoutes.js';
import taskRoutes from './Routes/taskRoutes.js';
import { errorHandler } from './Middleware/errorHandler.js';
import morgan from 'morgan'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketIOSetup } from './services/socket.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app= express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || '*',
        methods: ['GET', 'POST']
    }
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use('/api/auth',authRoutes);
app.use('/api/task',taskRoutes);

app.use(errorHandler);

socketIOSetup(io);

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});