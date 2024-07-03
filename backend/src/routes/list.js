import express from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { createList, getListData } from "../controller/listController.js";

const listRouter = express.Router();


/**
 * @swagger
 * /api/v1/lists/{slug}:
 *   get:
 *     summary: Get specific lists and tasks related to a board
 *     description: Retrieve specific lists and tasks related to a board using the slug parameter.
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug identifier for the list
 *     responses:
 *       '200':
 *         description: List retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listId:
 *                   type: string
 *                   description: The unique identifier for the list.
 *                   example: "1197c4cf-951e-4bec-841c-ba868f9120af"
 *                 listTitle:
 *                   type: string
 *                   description: The title of the list.
 *                   example: "finish"
 *                 tasks:
 *                   type: array
 *                   description: The tasks associated with the list.
 *                   items:
 *                     type: object
 *                     properties:
 *                       taskId:
 *                         type: string
 *                         description: The unique identifier for the task.
 *                         example: "95e1712e-5325-429c-97d7-23c3019ed422"
 *                       taskTitle:
 *                         type: string
 *                         description: The title of the task.
 *                         example: "mandi"
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
 *                       example: "Invalid slug provided"
 */


listRouter.get("/api/v1/lists/:slug", tryCatch(getListData));

/**
 * @swagger
 * /api/v1/lists:
 *   post:
 *     summary: Create a new list
 *     description: Endpoint to create a new list for a specific board.
 *     tags: [List]
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
