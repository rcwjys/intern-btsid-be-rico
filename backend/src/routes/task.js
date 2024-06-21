import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { createTask } from '../controller/taskController.js';

const taskRouter = express.Router();


/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with task title, list ID, and author ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskTitle:
 *                 type: string
 *                 minLength: 1
 *               listId:
 *                 type: string
 *               authorId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully created a new task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     taskTitle:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       '400':
 *         description: Bad request due to validation error or resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Validation error: Task title cannot be blank"
 */







taskRouter.post('/api/v1/tasks', tryCatch(createTask));


export { taskRouter };

