import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { createBoard } from '../controller/boardController.js';

const boardRouter = express.Router();
/**
 * @swagger
 * /api/v1/boards:
 *   post:
 *     summary: Create a new board
 *     description: Create a new board with a title and author ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardTitle:
 *                 type: string
 *                 minLength: 1
 *                 example: Project X Board
 *               authorId:
 *                 type: string
 *                 example: uuid
 *     responses:
 *       '200':
 *         description: Board created successfully
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
 *                     boardId:
 *                       type: string
 *                     boardTitle:
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
 *                       example: "Validation error: Board title cannot be blank"
 */




boardRouter.post('/api/v1/boards', tryCatch(createBoard));


export { boardRouter };