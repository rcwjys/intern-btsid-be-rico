import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { createBoard } from '../controller/boardController.js';

const boardRouter = express.Router();

/**
 * @swagger
 * /api/v1/boards:
 *   post:
 *     summary: Create a new board
 *     description: Endpoint to create a new board.
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
 *                 example: My Board
 *               authorId:
 *                 type: string
 *                 example: uuid
 *     responses:
 *       200:
 *         description: Board created successfully.
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
 *                       type: integer
 *                       description: The ID of the created board.
 *                     boardTitle:
 *                       type: string
 *                       description: The title of the created board.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the board was created.
 *       400:
 *         description: Bad request.
 */
boardRouter.post('/api/v1/boards', tryCatch(createBoard));


export { boardRouter };