import express from 'express';
import { blockUser, getUsers, getAllUsers, unblockUser } from '../controllers/userController.js';
import { authenticate, authorize } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['user', 'admin']), getUsers);
router.get('/all-users', authorize(['admin']), getAllUsers);
router.post('/:id/block', authorize(['admin']), blockUser);
router.post('/:id/unblock', authorize(['admin']), unblockUser);

export default router;