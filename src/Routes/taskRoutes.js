import express from 'express';
import { createTask, getTasks, editTask, deleteTask, assignTask, removeAssignee } from '../controllers/taskController.js';
import { authenticate,authorize } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', authorize(['user', 'admin']), createTask);
router.get('/', authorize(['user','admin']), getTasks);
router.patch('/edit/:id', authorize(['user', 'admin']), editTask);
router.delete('/delete/:id', authorize(['admin']), deleteTask);
router.patch('/assign/:id', authorize(['admin']), assignTask);
router.patch('/remove-assignee/:id', authorize(['admin']), removeAssignee);

export default router;