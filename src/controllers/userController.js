import User from '../Model/User.js';
import logs from '../utils/logs.js';

export const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const query = { _id: { $ne: req.user.userId } };

        if (req.user.role !== 'admin') {
            query.isBlocked = false;
        }

        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query.$or = [{ username: searchRegex }, { email: searchRegex }];
        }

        if (req.query.role) query.role = req.query.role;

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments(query);

        res.status(200).json({
            users,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view all users' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const query = { role:{ $ne:'admin'} };

        if (req.query.search) {
            query.$or = [{ username: new RegExp(req.query.search, 'i') }, { email: new RegExp(req.query.search, 'i') }];
        }

        if (req.query.role) query.role = req.query.role;

        const users = await User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await User.countDocuments(query);

        res.status(200).json({ users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
    } catch (error) {
        next(error);
    }
};

export const blockUser = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const result = await User.updateOne(
            { _id: req.params.id, isBlocked: false },
            { $set: { isBlocked: true } }
        );

        if (result.nModified === 0) {
            return res.status(400).json({ message: 'User is either already blocked or does not exist' });
        }

        logs.info(`User blocked: ${req.params.id}`);
        res.status(200).json({ message: 'User blocked successfully', userId: req.params.id });
    } catch (error) {
        next(error);
    }
};

export const unblockUser = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const result = await User.updateOne(
            { _id: req.params.id, isBlocked: true },
            { $set: { isBlocked: false } }
        );

        if (result.nModified === 0) {
            return res.status(400).json({ message: 'User is not blocked or does not exist' });
        }

        logs.info(`User unblocked: ${req.params.id}`);
        res.status(200).json({ message: 'User unblocked successfully', userId: req.params.id });
    } catch (error) {
        next(error);
    }
};