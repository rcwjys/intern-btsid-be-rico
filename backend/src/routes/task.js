import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { createTask, updateTask } from '../controller/taskController.js';

const taskRouter = express.Router();
/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with task title, list ID, and author ID.
 *     tags: [Task]
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
 *                     listId: 
 *                       type: string
 *                       example: 4290e6a0-8dde-4601-8b29-69d377966051
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

/**
 * @swagger
 * /api/v1/tasks:
 *   patch:
 *     summary: Update a Task
 *     description: Update the list ID of an existing task using task ID and list ID.
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 minLength: 1
 *               listId:
 *                 type: string
 *                 minLength: 1
 *     responses:
 *       '200':
 *         description: Successfully updated the task
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
 *                       example: "my task"
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
 *                       example: "Validation error: Task ID cannot be blank"
 */

taskRouter.patch('/api/v1/tasks', tryCatch(updateTask));


export { taskRouter };

