import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { createBoard, getBoardData } from "../controller/boardController.js";

const boardRouter = express.Router();

/**
 * @swagger
 * /api/v1/boards:
 *   get:
 *     summary: Retrieve board data for a user
 *     description: Fetches boards created by a specific user based on userId provided in the request body.
 *     security:
 *       - BearerAuth: []
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
 *                             example: c4c9a5d7-42b0-47f0-8b99-9d9a3ee91b69
 *                           board_title:
 *                             type: string
 *                             example: my first board
 *                           lists:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 list_id:
 *                                   type: string
 *                                   example: 0a463c71-15f3-4647-a7b8-794438b6345f
 *                                 list_title:
 *                                   type: string
 *                                   example: todo
 *                                 createdAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-06-24T08:12:09.757Z"
 *                                 updatedAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-06-24T08:12:09.757Z"
 *                                 tasks:
 *                                   type: array
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       task_id:
 *                                         type: string
 *                                         example: 55ff014c-3086-4c7d-afa5-65983436b5c1
 *                                       task_title:
 *                                         type: string
 *                                         example: nyapu
 *                                       createdAt:
 *                                         type: string
 *                                         format: date-time
 *                                         example: "2024-06-24T11:04:05.175Z"
 *                                       updatedAt:
 *                                         type: string
 *                                         format: date-time
 *                                         example: "2024-06-24T11:04:05.175Z"
 *           example:
 *             success: true
 *             data:
 *               boards:
 *                 - board_id: "c4c9a5d7-42b0-47f0-8b99-9d9a3ee91b69"
 *                   board_title: "my first board"
 *                   lists:
 *                     - list_id: "0a463c71-15f3-4647-a7b8-794438b6345f"
 *                       list_title: "todo"
 *                       createdAt: "2024-06-24T08:12:09.757Z"
 *                       updatedAt: "2024-06-24T08:12:09.757Z"
 *                       tasks:
 *                         - task_id: "55ff014c-3086-4c7d-afa5-65983436b5c1"
 *                           task_title: "nyapu"
 *                           createdAt: "2024-06-24T11:04:05.175Z"
 *                           updatedAt: "2024-06-24T11:04:05.175Z"
 *                         - task_id: "6b695561-6e49-4382-a1b7-271913a0d109"
 *                           task_title: "makan"
 *                           createdAt: "2024-06-24T08:29:03.238Z"
 *                           updatedAt: "2024-06-24T08:29:03.238Z"
 *                         - task_id: "df909913-b902-4cfc-a349-c9b9b8e95b99"
 *                           task_title: "mandi"
 *                           createdAt: "2024-06-24T08:28:58.067Z"
 *                           updatedAt: "2024-06-24T08:28:58.067Z"
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
