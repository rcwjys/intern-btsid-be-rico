import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { createBoard, getBoardData, getSharingBoard, shareBoard } from "../controller/boardController.js";

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
 *                           boardId:
 *                             type: string
 *                             example: c4c9a5d7-42b0-47f0-8b99-9d9a3ee91b69
 *                           boardTitle:
 *                             type: string
 *                             example: my first board
 *                          
 *           example:
 *             success: true
 *             data:
 *               boards:
 *                 - boardId: "c4c9a5d7-42b0-47f0-8b99-9d9a3ee91b69"
 *                   boardTitle: "my first board"
 *                   
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

boardRouter.get("/api/v1/boards/shares", tryCatch(getSharingBoard));

boardRouter.post("/api/v1/boards/:slug/shares", tryCatch(shareBoard));


export { boardRouter };
