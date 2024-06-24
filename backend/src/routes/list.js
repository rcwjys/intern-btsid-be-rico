import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { createList } from "../controller/listController.js";

const listRouter = express.Router();

/**
 * @swagger
 * /api/v1/lists:
 *   post:
 *     summary: Create a new list
 *     description: Endpoint to create a new list for a specific board.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listTitle:
 *                 type: string
 *                 minLength: 1
 *                 example: To-Do
 *               boardId:
 *                 type: string
 *                 example: uuid
 *     responses:
 *       '200':
 *         description: List created successfully.
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
 *                     listTitle:
 *                       type: string
 *                       description: The title of the created list.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the list was created.
 *       '400':
 *         description: Bad request.
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
 *                       example: "Validation error: list name cannot be blank"
 */
listRouter.post("/api/v1/lists", tryCatch(createList));

export { listRouter };
