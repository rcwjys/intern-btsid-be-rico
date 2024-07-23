import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { createBoard, getBoardData, getSharingBoard, shareBoard } from "../controller/boardController.js";

const boardRouter = express.Router();

/**
 * 
 * 
 * @swagger
 * /api/v1/boards:
 *   get:
 *     summary: Retrieve board data for a user
 *     description: Fetches boards created by a specific user based on userId provided in the request body.
 *     tags: [Boards]
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
 *     tags: [Boards]
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

/**
 * @swagger
 * /api/v1/boards/shares:
 *   get:
 *     summary: Share a board with a collaborator
 *     description: Share a specific board identified by its boardId with a collaborator by their email.
 *     tags: [Boards]
 *     responses:
 *       '200':
 *         description: Board shared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       board:
 *                         type: object
 *                         properties:
 *                           boardId:
 *                             type: string
 *                             example: "7befc236-d596-447e-a456-e47e4dbf3114"
 *                           boardTitle:
 *                             type: string
 *                             example: "board nanen"
 *                           boardSlug:
 *                             type: string
 *                             example: "board-nanen"
 *                           author:
 *                             type: object
 *                             properties:
 *                               userId:
 *                                 type: string
 *                                 example: "06fa55c0-ace0-41d7-91cf-7b2aeece34ef"
 *                               userName:
 *                                 type: string
 *                                 example: "nanen 59554"
 *                       collaborators:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             userId:
 *                               type: string
 *                               example: "a2b28a98-05f9-4caa-bef8-0bd45f7fe938"
 *                             userName:
 *                               type: string
 *                               example: "gikah4010"
 *       '500':
 *         description: Internal server error
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
 *                       example: "Internal server error"
 */

boardRouter.get("/api/v1/boards/shares", tryCatch(getSharingBoard));
/**
 * @swagger
 * /api/v1/boards/{boardId}/shares:
 *   post:
 *     summary: Share a board with a collaborator
 *     description: Share a specific board identified by its boardId with a collaborator by their email.
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The ID of the board to be shared
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               collaboratorEmail:
 *                 type: string
 *                 minLength: 1
 *                 example: collaborator@example.com
 *     responses:
 *       '200':
 *         description: Board shared successfully
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
 *                     board:
 *                       type: object
 *                       properties:
 *                         boardId:
 *                           type: string
 *                           example: "7befc236-d596-447e-a456-e47e4dbf3114"
 *                         boardTitle:
 *                           type: string
 *                           example: "board nanen"
 *                         boardSlug:
 *                           type: string
 *                           example: "board-nanen"
 *                         author:
 *                           type: object
 *                           properties:
 *                             userId:
 *                               type: string
 *                               example: "06fa55c0-ace0-41d7-91cf-7b2aeece34ef"
 *                             userName:
 *                               type: string
 *                               example: "nanen 59554"
 *                         collaborator:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               userId:
 *                                 type: string
 *                                 example: "a2b28a98-05f9-4caa-bef8-0bd45f7fe938"
 *                               userName:
 *                                 type: string
 *                                 example: "gikah4010"
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
 *                       example: "Validation error: user is not found"
 *       '500':
 *         description: Internal server error
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
 *                       example: "Internal server error"
 */
boardRouter.post("/api/v1/boards/:boardId/shares", tryCatch(shareBoard));


export { boardRouter };
