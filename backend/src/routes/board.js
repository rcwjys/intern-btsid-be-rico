import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { createBoard, getBoardData } from "../controller/boardController.js";

const boardRouter = express.Router();

/**
 * @swagger
 * /board-data:
 *   get:
 *     summary: Retrieve board data for a user
 *     description: Fetches boards created by a specific user based on userId provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: f9448035-2e75-42b6-851b-7a3016835c5e
 *     responses:
 *       '200':
 *         description: Successful response
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
 *                     boards:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           board_id:
 *                             type: string
 *                             example: 0d08b4db-9775-4a43-ab63-a6ce552d29be
 *                           board_title:
 *                             type: string
 *                             example: my first board
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-06-20T04:49:00.567Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-06-20T04:49:00.567Z"
 *                           author:
 *                             type: object
 *                             properties:
 *                               user_id:
 *                                 type: string
 *                                 example: f9448035-2e75-42b6-851b-7a3016835c5e
 *                               user_name:
 *                                 type: string
 *                                 example: rico wijaya
 *       '404':
 *         description: Board not found error
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
 *                       example: board is not found
 */

boardRouter.get("/api/v1/boards", tryCatch(getBoardData));

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
boardRouter.post("/api/v1/boards", tryCatch(createBoard));

export { boardRouter };
