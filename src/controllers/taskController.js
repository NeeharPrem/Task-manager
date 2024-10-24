import Task from '../Model/Tasks.js';
import { validateTask, validateEdit } from '../Utils/taskValidator.js';

export const createTask = async (req, res, next) => {
    try {
        const { error } = validateTask(req.body);
        if (error) return res.status(400).json({ message: 'Validation Error: ' + error.details[0].message });

        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.duedate,
            priority: req.body.priority,
            createdBy: req.user.userId,
            updatedBy: req.user.userId
        });

        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};
        if (req.query.status) query.status = req.query.status;
        if (req.query.priority) query.priority = req.query.priority;
        if (req.query.assignee) query.assignees = req.query.assignee;
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        const tasks = await Task.find(query)
            .populate('assignees', 'username email')
            .populate('createdBy', 'username')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Task.countDocuments(query);
        res.json({ message: 'Tasks retrieved successfully', tasks,
            pagination: { page, limit, total, pages: Math.ceil(total / limit)}
        });
    } catch (error) {
        next(error);
    }
};

export const editTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error } = validateEdit(req.body);
        if (error) return res.status(400).json({ message: 'Validation Error: ' + error.details[0].message });

        const updatedData = {};
        if (req.body.title) updatedData.title = req.body.title;
        if (req.body.description) updatedData.description = req.body.description;
        if (req.body.priority) updatedData.priority = req.body.priority;
        if (req.body.duedate) updatedData.dueDate = req.body.duedate;
        if (req.body.status) updatedData.status = req.body.status;

        updatedData.updatedBy = req.user.userId;
        const task = await Task.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task updated successfully', task });
    } catch (error) {
        next(error);
    }
};


export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.status(204).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const assignTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { assignees } = req.body;

        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.assignees = assignees;
        task.updatedBy = req.user.userId;
        await task.save();

        res.json({ message: 'Task assigned successfully', task });
    } catch (error) {
        next(error);
    }
};

export const removeAssignee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (!task.assignees.includes(userId)) {
            return res.status(400).json({ message: 'User not assigned to this task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(id,
            {
            $pull: { assignees: userId },
            $set: { updatedBy: req.user.userId }
            },
            { new: true }
        );

        res.json({ message: 'Assignee removed successfully', task: updatedTask });
    } catch (error) {
        next(error);
    }
};