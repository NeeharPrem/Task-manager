import jwt from 'jsonwebtoken';
import User from '../Model/User.js';
import { loginValidate, registrationValidate } from '../Utils/authValidator.js';
import bcrypt from 'bcrypt'

export const register = async (req, res, next) => {
    try {
        const { error } = registrationValidate(req.body);
        if (error) throw new Error(error.details[0].message);

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            message: 'Account created successfully'});
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { error } = loginValidate(req.body);
        if (error) throw new Error(error.details[0].message);

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ message:'Login successfully', token, refreshToken });
    } catch (error) {
        next(error);
    }
};